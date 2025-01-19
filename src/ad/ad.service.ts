// ad.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdDto } from './dto/create-ad.dao';
import { EditAdDto } from './dto/edit-ad.dao';


@Injectable()
export class AdService {
  constructor(private prisma: PrismaService) {}

  async getAllAds() {
    return this.prisma.ad.findMany({
      include: {
        category: true,
        user: true,
      },
    });
  }

  async getAdById(adId: number) {
    return this.prisma.ad.findUnique({
      where: {
        id: adId,
      },
      include: {
        category: true,
        user: true,
      },
    });
  }

  async createAd(userId: number, dto: CreateAdDto) {
    return this.prisma.ad.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async editAdById(adId: number, userId: number, dto: EditAdDto) {
    const ad = await this.prisma.ad.findUnique({
      where: {
        id: adId,
      },
    });

    if (!ad || ad.userId !== userId) {
      throw new ForbiddenException('You do not have permission to edit this ad');
    }

    return this.prisma.ad.update({
      where: {
        id: adId,
      },
      data: dto,
    });
  }

  async deleteAdById(adId: number, userId: number) {
  
    const ad = await this.prisma.ad.findUnique({
      where: { id: adId },
    });
  
  
    if (ad.userId !== userId) {
      throw new Error('You are not allowed to delete this.');
    }
  
    await this.prisma.ad.delete({
      where: { id: adId },
    });
  
    return { message: 'Success' };
  }

  async getAdsByCategoryId(categoryId: number) {
    return this.prisma.ad.findMany({
      where: { categoryId },
      include: {
        category: true,
        user: true,
      },
    });
  }
  
  async getAdsByUserId(userId: number) {
    return this.prisma.ad.findMany({
      where: { userId },
      include: {
        category: true,
        user: true,
      },
    });
  }
  
}
