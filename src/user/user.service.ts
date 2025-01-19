import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto, EditUserDto } from './dto';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

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

  async getUserRole(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return user?.role ?? 'USER'; 
  }

  async changeRole(adminUserId: number, targetUserId: number, newRole: Role) {
    const adminUser = await this.prisma.user.findUnique({
      where: { id: adminUserId },
    });

    if (adminUser?.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can change roles');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { role: newRole },
    });

    return updatedUser;
  }

  async changePassword(
    userId: number,
    dto: ChangePasswordDto,
  ) {
    
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { hash: true },
    });
  
    if (!user || !user.hash) {
      throw new ForbiddenException('User not found or no password set');
    }
  


    const isOldPasswordValid = await argon.verify(
      user.hash,
      dto.oldPassword,
    );
  
    if (!isOldPasswordValid) {
      throw new ForbiddenException('Old password is incorrect');
    }
  
    const newHash = await argon.hash(dto.newPassword);
  
  
    await this.prisma.user.update({
      where: { id: userId },
      data: { hash: newHash },
    });
  
    return { message: 'Password updated successfully' };
  }
  
  
}
