import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, EditCategoryDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  getCategories() {
    return this.prisma.category.findMany();
  }

  async createCategory(dto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
        data:{
            ...dto
        }
    })

    return category;
  }

  getCategoryById(categoryId: number) {
    return this.prisma.category.findFirst({
        where:{
            id: categoryId
        }
    })
  }

  async editCategoryById(categoryId: number, dto: EditCategoryDto) {

    return this.prisma.category.update({
        where:{
            id: categoryId
        },
        data:{
            ...dto
        }
    })
   
  }
  //comit

  async deleteCategoryById(categoryId: number) {
    await this.prisma.category.delete({
        where:{
            id: categoryId
        }
    })
  }
}
