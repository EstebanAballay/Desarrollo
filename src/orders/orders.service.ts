import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepository: Repository<Order>) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const newOrder = this.ordersRepository.create({
      ...data,
      status: 'pending',
      delivery: null,
    });
    return this.ordersRepository.save(newOrder);
  }

  async getAllOrders(page = 1, limit = 10): Promise<{ data: Order[]; total: number }> {
  const [result, total] = await this.ordersRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { id: 'ASC' }, // orden opcional
  });

  return {
    data: result,
    total,
  };
}

  async getOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
    await this.ordersRepository.update(id, data);
    const updatedOrder = await this.ordersRepository.findOneBy({ id });
    if (!updatedOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return updatedOrder;
  }

  async updatePartialOrder(id: number, updates: Partial<Order>): Promise<Order> {
    await this.ordersRepository.update(id, updates);
    const updatedOrder = await this.ordersRepository.findOneBy({ id });
    if (!updatedOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<void> {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }
}



/*
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
*/