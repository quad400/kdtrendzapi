import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from './entities/size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    await this.findUnique(createSizeDto.name);
    let color = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(color);
  }

  async findAll() {
    return await this.sizeRepository.find();
  }

  async findOne(id: string) {
    const size = await this.sizeRepository.findOneBy({ id });
    if (!size) {
      throw new NotFoundException('Size not found');
    }

    return size;
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    const size = await this.findOne(id);

    await this.findUnique(updateSizeDto.name);
    const setSize = Object.assign(size, updateSizeDto);
    return await this.sizeRepository.save(setSize);
  }

  async findUnique(name: string) {
    const isExist = await this.sizeRepository.findOneBy({
      name,
    });
    if (isExist) {
      throw new ConflictException(`Size name  "${name}" already exists`);
    }
  }

  async remove(id: string) {
    const result = await this.sizeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Size with ID ${id} not found`);
    }
  }
}
