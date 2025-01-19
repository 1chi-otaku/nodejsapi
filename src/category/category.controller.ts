import {
    Controller,
    UseGuards,
    Get,
    Post,
    Delete,
    Patch,
    Param,
    ParseIntPipe,
    Body,
    ForbiddenException,
    NotFoundException
  } from '@nestjs/common';
  import { JwtGuard } from 'src/auth/guard';
  import { CategoryService } from './category.service';
  import { CreateCategoryDto, EditCategoryDto } from './dto';
  import { Role } from '@prisma/client';
  import { GetUser } from '../auth/decorator';
  
  @UseGuards(JwtGuard)
  @Controller('category')
  export class CategoryController {
    constructor(private categoryService: CategoryService) {}
  
    @Get()
    getCategories() {
      return this.categoryService.getCategories();
    }
  
    @Post()
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @GetUser('role') role: Role, // Получаем роль текущего пользователя
  ) {
    if (role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to create categories');
    }
    return this.categoryService.createCategory(dto);
  }
  
    @Get(':id')
    getCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
      return this.categoryService.getCategoryById(categoryId);
    }
  
    @Patch(':id')
  async editCategoryById(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() dto: EditCategoryDto,
    @GetUser('role') role: Role, 
  ) {
    if (role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to edit categories');
    }
    
    const category = await this.categoryService.editCategoryById(categoryId, dto);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return category;
  }
  
  @Delete(':id')
  async deleteCategoryById(
    @Param('id', ParseIntPipe) categoryId: number,
    @GetUser('role') role: Role, // Получаем роль текущего пользователя
  ) {
    if (role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete categories');
    }

    const category = await this.categoryService.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    await this.categoryService.deleteCategoryById(categoryId);
    return { message: 'Category deleted successfully' };
  }
  }
  