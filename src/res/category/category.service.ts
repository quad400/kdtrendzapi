import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Response } from 'src/lib/common/utility/response';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: TreeRepository<CategoryEntity>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const { title, parentId } = createCategoryDto;

    const category = new CategoryEntity();
    category.title = title;

    if (parentId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: parentId },
      });
      if (!parentCategory) {
        throw new NotFoundException(
          `Parent category with ID ${parentId} not found`,
        );
      }
      category.parent = parentCategory;
    }

    return this.categoryRepository.save(category);
  }

  async findAllCategory(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({ relations: ['parent', 'children'] });
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const { title, parentId } = updateCategoryDto;

    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (title) {
      category.title = title;
    }

    if (parentId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: parentId },
      });
      if (!parentCategory) {
        throw new NotFoundException(
          `Parent category with ID ${parentId} not found`,
        );
      }
      category.parent = parentCategory;
    }

    return this.categoryRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return await this.categoryRepository.delete(id);
  }
}
