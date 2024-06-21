import { Board } from "src/boards/entity/board.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  originalname: string;

  @Column()
  filename: string;

  @Column()
  downloadPath: string;

  @ManyToOne(() => Board, (board) => board.file, {eager: false})
  board: Board;
}