import { Order } from 'src/orders/entities/order.entity';
import { UserAddress } from 'src/user-address/entities/user-address.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToOne, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'int' })
  age: number;

  //User details
  @OneToOne(() => UserAddress, (userAddress) => userAddress.user)
  userAddress: UserAddress;

  //One to many
  @OneToMany(() => Order, (order) => order.user)
  orders: Order;
}
