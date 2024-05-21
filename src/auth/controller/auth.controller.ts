import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('/signUp')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.userService.signUp(authCredentialsDto);
  }

  @Post(`/signIn`)
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialsDto);
  }

  @Post(`/test`)
  @UseGuards(AuthGuard()) // 토큰 체크 미들웨어, 정보가 잘못 작성 되어 있을 시 예외처리 
  test(@Req() req) {
    console.log(`req: `,req)
  }
}
