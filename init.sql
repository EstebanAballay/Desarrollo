INSERT INTO order(
    id, 
    userId, 
    restaurantId, 
    delivery,
    products, 
    location,
    createdAt,
    stateId)
    
     VALUES (1, 'ORD123456', 'John Doe', 150.00, ' -10-01', 'Pending')

@PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  restaurantId: number;

  @Column({ nullable: true })
  delivery: string;

  @Column('int', { array: true })
  products: number[];

  @Column({ type: 'json' })
  location: any;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 1 }) // Estado por defecto: pending (id = 1)
  stateId: number;