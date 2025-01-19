import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAdDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  price: number;

  @IsInt()
  categoryId: number;  
}