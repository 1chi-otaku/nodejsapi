import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Category } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



@Injectable()
export class AuthService{

    constructor(private prisma: PrismaService) {}

    

    async signup(dto: AuthDto){
        //Password hash generation
        const hash = await argon.hash(dto.password);

        //Saving the new user to the database
        try{
          const user = await this.prisma.user.create({
            data: {
              email: dto.email,
              hash,
            },
          });

          delete user.hash;
          // Returning the saved user
          return user;

        }catch(error){
          if(error instanceof PrismaClientKnownRequestError){
            // Prisma has error codes, P2002 stands for duplicated object (new record with the unique field)
            if(error.code === 'P2002'){
              throw new ForbiddenException('Credentials taken. Values must be unique')
            }
          }
        }
       

          
        

    }

    async signin(dto: AuthDto) {
      // find the user by email
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });
      // if user does not exist throw exception
      if (!user)
        throw new ForbiddenException(
          'Credentials incorrect',
        );
  
      // compare password
      const pwMatches = await argon.verify(
        user.hash,
        dto.password,
      );
      // if password incorrect throw exception
      if (!pwMatches)
        throw new ForbiddenException(
          'Credentials incorrect',
        );
      
        delete user.hash;
        
        return user;
    }

   

}