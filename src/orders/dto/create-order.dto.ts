import { IsArray, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  restaurantId: number;

  @IsArray()
  products: number[];

  @IsObject()
  location: any;
}