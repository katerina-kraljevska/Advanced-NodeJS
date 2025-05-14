import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entites/users.entites';
import { OneToOne } from 'typeorm';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  zipCode: string;

  @OneToOne(() => User, (user) => user.userAddress)
  @JoinColumn()
  user: User;
}
