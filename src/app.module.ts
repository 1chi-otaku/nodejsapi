import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';



@Module({
  imports: [ConfigModule.forRoot({}), AuthModule, UserModule, CategoryModule, PrismaModule, MessageModule],
})

export class AppModule {}
