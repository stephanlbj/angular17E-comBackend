import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {



    constructor(private readonly authService : AuthService){}


@Post('add')
 saveUser(@Body() body: Prisma.UserCreateInput):Observable<any>{
    return this.authService.saveUser(body)
 }


}
