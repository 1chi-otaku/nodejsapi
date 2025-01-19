import { Injectable } from "@nestjs/common";
import { User, Category } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable()
export class AuthService{

    constructor(private prisma: PrismaService) {}

    

    async signup(dto: AuthDto){
        //Password hash generation
        const hash = await argon.hash(dto.password);

        //Saving the new user to the database
        const user = await this.prisma.user.create({
            data: {
              email: dto.email,
              hash,
            },
          });


          // Returning the saved user
          return user;
        

    }


    signin(){
        return {msg: 'Ive signup'};
    }

}