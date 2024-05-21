// 커스텀 데코레이션 

import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { User } from "./entity/user.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    // 현재 컨텍스트를 http 모드로 변환 
    const req = ctx.switchToHttp().getRequest();
    return req.user
})

