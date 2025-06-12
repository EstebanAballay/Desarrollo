import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class paymentmethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string; //Codigo de representacion de forma de pago, ej: efectivo "EF"


  //Creo que falta las relaciones en la bd
}
