import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) { 
            super({
              //토큰 인증 시 사용할 키, 이건 토큰 생성시 사용한 비밀 키와 같아야 된다.
              secretOrKey: jwtConfig.secret,
              // 인증 할 토큰을 클라이언드 어디서 가져 올 것인지 정의하기
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            });
        }
    
    // 토큰 해독 후 나온 페이로드 값을 이용해서 사용자 정보 가져오기 
    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({
          where: { username },
        });
        // 해당 유저 없으면 예외 처리
        if(!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}