import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({})
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  name: string;

  @Column({})
  email: string;

  @Column()
  password: string;

  @Column()
  age: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
