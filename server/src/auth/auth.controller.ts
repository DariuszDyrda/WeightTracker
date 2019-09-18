import { Controller, Post, Body, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
       return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string, username: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    //Example GET route
    @Get('/example')
    example() {
        console.log("Req to Example route")
        return {message: "This is an example GET route"};
    }
}
