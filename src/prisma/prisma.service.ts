import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';


dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
          datasources: {
            db: {
              url: process.env.DATABASE_URL, 
            },
          },
        });
    }
}
