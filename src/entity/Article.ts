import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn
} from "typeorm";
import { Length } from "class-validator";

@Entity()
export class Article {
  @ObjectIdColumn()
  _id: number;

  @Column()
  @Length(10, 40)
  title: string;

  @Column()
  author: string;

  @Column()
  content: string;

  @Column()
  keyWords: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
