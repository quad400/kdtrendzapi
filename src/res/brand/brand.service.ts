import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UserEntity } from '../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { paginate } from 'src/lib/common/utility/pagination.utils';
import { PageOptionsDto } from 'src/lib/common/dto/pagination.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,

    private readonly userService: UserService,
  ) {}

  async createBrand(
    userId: string,
    createBrandDto: CreateBrandDto,
  ): Promise<BrandEntity> {
    const user = await this.userService.findById(userId);

    await this.findOne(userId, createBrandDto.name);
    
    const brand = this.brandRepository.create({ ...createBrandDto, user });
    return await this.brandRepository.save(brand);
  }

  async updateBrand(
    userId: string,
    data: UpdateBrandDto,
  ): Promise<BrandEntity> {
    const brand = await this.findBy(userId);

    await this.findOne(userId, data.name);
    
    Object.assign(brand, data);
    await this.brandRepository.save(brand);

    return brand;
  }

  async getBrand(userId: string) {
    return await this.findBy(userId);
  }

  async findAll(paginationDto: PageOptionsDto) {
    return paginate(this.brandRepository, paginationDto, 'brands');
  }

  async findOne(userId: string, brandName: string) {
    const findUser = await this.brandRepository.findOneBy({ user_id: userId });
    if (findUser) {
      throw new ConflictException('User already has a brand');
    }
    const findName = await this.brandRepository.findOneBy({ name: brandName });

    if (findName) {
      throw new ConflictException('Brand name already exist');
    }
  }

  async findBy(userId: string) {
    const brand = await this.brandRepository.findOneBy({ user_id: userId });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  async deleteBrand(userId: string) {
    const brand = await this.brandRepository.findOneBy({ user_id: userId });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return await this.brandRepository.remove(brand);
  }
}
