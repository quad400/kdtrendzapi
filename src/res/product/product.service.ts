import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageEntity } from './entity/image.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/lib/common/dto/pagination.dto';
import { UpdateProductDto } from './dto/update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(ImageEntity)
    private productImageRepository: Repository<ImageEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createProduct(brand_id: string, createProductDto: CreateProductDto) {
    const { category, title, images, ...data } = createProductDto;

    await this.findUnique(title);

    const categoryEntity = await this.categoryRepository.findOne({
      where: { id: category },
    });
    if (!categoryEntity) {
      throw new NotFoundException('Category not found');
    }

    // Create a new product entity
    let product = await this.productRepository.save({
      category: categoryEntity,
      brand_id,
      title,
      ...data,
    });

    const productImages = images.map((image) => {
      const productImage = new ImageEntity();
      productImage.url = image;
      productImage.product = product;
      return productImage;
    });

    await this.productImageRepository.save(productImages);
    product = await this.productRepository.save(product);

    return product;
  }

  async findUnique(title: string) {
    const product = await this.productRepository.findOneBy({ title });
    if (product) {
      throw new ConflictException(`Product with '${title}' already exist`);
    }
  }
  async getProducts(query: PageOptionsDto) {
    const { limit, page, search, order, category, color, size } = query;

    const skip = (page - 1) * limit;

    let categoryIds = [];

    if (category) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: category },
        relations: ['children'],
      });

      if (!parentCategory) {
        throw new NotFoundException(`Category with ID ${category} not found`);
      }

      categoryIds = this.getCategoryIds(parentCategory);
    }

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.brand', 'brand')
      .select([
        'product',
        'category',
        'colors',
        'sizes',
        'images.id',
        'images.url',
        'brand.id',
        'brand.name',
      ]);

    if (categoryIds.length > 0) {
      queryBuilder.where('category.id IN (:...categoryIds)', { categoryIds });
    }

    // Apply search by product name
    if (search) {
      queryBuilder.andWhere('product.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    // Apply filter by color
    if (color) {
      queryBuilder.andWhere('colors.name = :color', { color });
    }

    // Apply filter by size
    if (size) {
      queryBuilder.andWhere('sizes.name = :size', { size });
    }

    queryBuilder.orderBy(`product.created_at`, order).skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const products = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: query,
    });

    return new PageDto(products, pageMetaDto);
  }

  private getCategoryIds(category: CategoryEntity): string[] {
    const categoryIds = [category.id];
    if (category.children && category.children.length > 0) {
      category.children.forEach((child) => {
        categoryIds.push(...this.getCategoryIds(child));
      });
    }
    return categoryIds;
  }

  async getProduct(id: string) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.brand', 'brand')
      .select([
        'product',
        'category',
        'colors',
        'sizes',
        'images.id',
        'images.url',
        'brand.id',
        'brand.name',
      ])
      .where('product.id = :id', { id })
      .getOne();


    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  
  async updateProduct(id: string, data: UpdateProductDto, brand_id: string) {
    const { images, ...updateData } = data;
  
    const product = await this.productRepository.findOne({
      where: { id, brand_id },
    });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    if (data?.title) {
      await this.findUnique(data?.title);
    }
  
    await this.productImageRepository.delete({ product: product });
  
    Object.assign(product, updateData);
  
    const updatedProduct = await this.productRepository.save(product);
  
    if (images && images.length > 0) {
      const productImages = images.map((imageUrl) => {
        const productImage = new ImageEntity();
        productImage.url = imageUrl;
        productImage.product_id = updatedProduct.id;
        return productImage;
      });
  
      await this.productImageRepository.save(productImages);
  
      updatedProduct.images = productImages;
      await this.productRepository.save(updatedProduct);
    }
  
    return updatedProduct;
  }

  async deleteProduct(id: string, brand_id: string) {
    const product = await this.productRepository.findOne({
      where: { id, brand_id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.remove(product);
  }
  
}
