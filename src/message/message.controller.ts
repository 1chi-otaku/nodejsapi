import { Controller, UseGuards, Get, Post, Delete, Patch, Param, ParseIntPipe, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { MessageService } from './message.service';
import { CreateMessageDto, EditMessageDto } from './dto';
import { GetUser } from '../auth/decorator';  // Import GetUser decorator

@UseGuards(JwtGuard)
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Get(':id')
  getMessageById(@Param('id', ParseIntPipe) messageId: number) {
    return this.messageService.getMessageById(messageId);
  }

  @Post()
  createMessage(
    @GetUser('id') userId: number, 
    @Body() dto: CreateMessageDto,
  ) {
    return this.messageService.createMessage(userId, dto);  // Pass userId to the service method
  }

  @Patch(':id')
  editMessageById(
    @Param('id', ParseIntPipe) messageId: number,
    @Body() dto: EditMessageDto,
  ) {
    return this.messageService.editMessageById(messageId, dto);
  }

  @Delete(':id')
  deleteMessageById(@Param('id', ParseIntPipe) messageId: number) {
    return this.messageService.deleteMessageById(messageId);
  }
}
