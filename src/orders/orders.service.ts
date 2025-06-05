import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const newOrder = this.ordersRepository.create({
      ...data,
      status: 'pending',
      delivery: null,
    });
    return this.ordersRepository.save(newOrder);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
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
