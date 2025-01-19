import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto, EditMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  getAllMessages() {
    return this.prisma.message.findMany();
  }

  getMessageById(messageId: number) {
    return this.prisma.message.findFirst({
      where: {
        id: messageId,
      },
    });
  }

  async createMessage(userId: number, dto: CreateMessageDto) {  // Add userId parameter
    const message = await this.prisma.message.create({
      data: {
        senderId: userId,  
        ...dto,
      },
    });
    return message;
  }

  async editMessageById(messageId: number, dto: EditMessageDto) {
    return this.prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteMessageById(messageId: number) {
    await this.prisma.message.delete({
      where: {
        id: messageId,
      },
    });
  }
}
