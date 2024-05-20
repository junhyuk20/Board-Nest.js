import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username']) // 중복시키지 않을 필드명을 작성시 해당 필드를 유니크 시킴, 배열이기 떄문에 필드 여러개 넣어도 됨
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    password: string;
}