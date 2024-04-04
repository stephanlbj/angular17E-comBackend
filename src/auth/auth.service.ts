import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Observable, catchError, from, switchMap } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {

constructor(private databaseService:DatabaseService){}


 saveUser(body: Prisma.UserCreateInput) {

    const test = async ()=>{
           const isExist = await this.databaseService.user.findUnique({
          where: { email: body.email }
          })

          if(isExist!=null)
          return {message:"User already exists.", data: isExist}

          const saveUser = await this.databaseService.user.create({
            data:{
                 accessToken: body.accessToken,
                 email: body.email,
                 firstName: body.firstName,
                 lastName: body.lastName,
                 picture: body.picture
            }
          })

          if(saveUser==null){
            throw new HttpException('Something has happened.',HttpStatus.FORBIDDEN)
            }

           return {message:"User create successfully.", data: saveUser} 
          

    }
    return from(test())

}



}
