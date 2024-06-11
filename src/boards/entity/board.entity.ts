import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "../board-status.enum";
import { User } from "src/auth/entity/user.entity";
import { UploadFile } from "src/file/entity/file.entity";



 @Entity()
 export class Board {
   @PrimaryGeneratedColumn() // typeorm 에서는 pk에 의존성이 크기 때문에 pk 없이 entity를 생성 할 수 없다.(만드는 방법은 있지만 하지마!)
   id: number;

   @Column()
   title: string;

   @Column()
   description: string;

   @Column()
   status: BoardStatus;

   @ManyToOne(() => User, (user) => user.boards, { eager: false })
   user: User;

   @OneToMany(() => UploadFile, (file) => file.board, { eager: true })
   file: File;
 }
