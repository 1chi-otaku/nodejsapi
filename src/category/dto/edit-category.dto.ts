import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class EditCategoryDto {

  @IsOptional()  
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}