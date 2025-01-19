import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto, EditUserDto } from './dto';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async changePassword(
    userId: number,
    dto: ChangePasswordDto,
  ) {
    // Логируем входные данные
    console.log('Incoming DTO:', dto);
    
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { hash: true },
    });
  
    if (!user || !user.hash) {
      throw new ForbiddenException('User not found or no password set');
    }
  
    // Логируем хэш пользователя
    console.log('User hash:', user.hash);
  
    // Проверить старый пароль
    const isOldPasswordValid = await argon.verify(
      user.hash,
      dto.oldPassword,
    );
  
    if (!isOldPasswordValid) {
      throw new ForbiddenException('Old password is incorrect');
    }
  
    // Хэшировать новый пароль
    const newHash = await argon.hash(dto.newPassword);
  
    // Логируем обновление пароля
    console.log('New hash:', newHash);
  
    await this.prisma.user.update({
      where: { id: userId },
      data: { hash: newHash },
    });
  
    return { message: 'Password updated successfully' };
  }
  
  
}
