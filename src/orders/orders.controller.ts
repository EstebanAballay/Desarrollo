import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Crear una orden
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  // Listar todas las órdenes
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // Obtener una orden por ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(+id);
  }

  // Actualizar el estado de una orden (por ID de estado)
  @Patch(':id')
  updateState(
    @Param('id') id: number,
    @Body() body: { state: number } // ⚠️ Se espera un número (ID del estado)
  ) {
    return this.ordersService.updateState(+id, body.state);
  }

  // Eliminar una orden
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.remove(+id);
  }
}
