import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
                @InjectRepository(User)
                private userRepository: Repository<User>,
                ) {}

    //* 유저 생성
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        // salt 값 가져오기 
        const salt = await bcrypt.genSalt();
        // salt 값을 이용한 비빌번호 해쉬화 
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
          username,
          password: hashedPassword,
        });    

        try {
           const createUserResult =  await this.userRepository.save(user);
        } catch (error) {
            // user name 이 중복 될시 아래 코드명의 예외 발생
            if (error.code === '23505') {
                throw new ConflictException(`Existing username`);
            } else {
                throw new InternalServerErrorException();
            }
            
            
        }
        
        
        
        
    }
}
