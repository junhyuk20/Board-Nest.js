import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
                @InjectRepository(User)
                private userRepository: Repository<User>,
                ) {}

    //* 유저 생성
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = this.userRepository.create({ username, password });    

        try {
            await this.userRepository.save(user);
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
