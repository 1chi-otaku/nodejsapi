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
  } from '@nestjs/common';
  import { JwtGuard } from 'src/auth/guard';
  import { CategoryService } from './category.service';
  import { CreateCategoryDto, EditCategoryDto } from './dto';
  
  @UseGuards(JwtGuard)
  @Controller('category')
  export class CategoryController {
    constructor(private categoryService: CategoryService) {}
  
    @Get()
    getCategories() {
      return this.categoryService.getCategories();
    }
  
    @Post()
    createCategory(@Body() dto: CreateCategoryDto) {
      return this.categoryService.createCategory(dto);
    }
  
    @Get(':id')
    getCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
      return this.categoryService.getCategoryById(categoryId);
    }
  
    @Patch(':id')
    editCategoryById(
      @Param('id', ParseIntPipe) categoryId: number,
      @Body() dto: EditCategoryDto,
    ) {
      return this.categoryService.editCategoryById(categoryId, dto);
    }
  
    @Delete(':id')
    deleteCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
      return this.categoryService.deleteCategoryById(categoryId);
    }
  }
  