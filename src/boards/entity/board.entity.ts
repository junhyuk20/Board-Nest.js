import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "../board-status.enum";
import { User } from "src/auth/entity/user.entity";


 @Entity()
export class Board   {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @Column()
  filePath: string;

  @ManyToOne(() => User, (user) => user.boards, {eager: false})
  user: User;

}
