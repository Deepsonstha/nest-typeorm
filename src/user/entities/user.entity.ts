import { Post } from 'src/post/entities/post_entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({
    select: false,
  })
  password: string;

  @Column()
  age: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post;
}
