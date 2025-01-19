import { IsInt, IsOptional, IsString } from 'class-validator';

export class EditMessageDto {
    @IsString()
    @IsOptional()
    content?: string;
  

  
    @IsInt()
    @IsOptional()
    receiverId?: number;
  }