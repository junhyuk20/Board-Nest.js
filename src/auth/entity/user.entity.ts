import { isNotEmpty } from "class-validator";
import { Board } from "src/boards/entity/board.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username']) // 중복시키지 않을 필드명을 작성시 해당 필드를 유니크 시킴, 배열이기 떄문에 필드 여러개 넣어도 됨
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Board, (board) => board.user, { eager: true, nullable: false}) // eager 속성을 true로 하면 user정보를 가져올 때 연결된 board 정보도 가져오겠다.
    boards: Board[] // 사용자는 여러 게시물을 만들 수 있기 때문에 type을 배열로 지정 
}