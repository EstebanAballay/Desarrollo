import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order)private readonly orderRepo: Repository<Order>,) {}

  async create(dto: CreateOrderDto) {
    const order = this.orderRepo.create({
      ...dto,
      // No hace falta pasar stateId si usás default
    });

    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({ relations: ['state'] });
  }

  findOne(id: number) {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['state'],
    });
  }

  async updateState(id: number, newStateId: number) {
    return this.orderRepo.update(id, { stateId: newStateId });
  }

  async remove(id: number) {
    await this.orderRepo.delete(id);
    return { message: 'deleted' };
  }
}