import { IsInt, IsOptional, IsString } from 'class-validator';


export class CreateMessageDto {
    @IsString()
    content: string;

    @IsInt()
    receiverId: number;
  }