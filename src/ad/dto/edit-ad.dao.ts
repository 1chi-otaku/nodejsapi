import { IsInt, IsOptional, IsString } from 'class-validator';

export class EditAdDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsInt()
  categoryId?: number;  
}