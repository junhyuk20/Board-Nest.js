import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';


@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  /*   @Post('/signUp')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.userService.signUp(authCredentialsDto);
  } */


}
