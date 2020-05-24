import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('core/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const loginResult = this.authService.login(email, password);

        return loginResult;
    }
}