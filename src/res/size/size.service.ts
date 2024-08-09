import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(createSizeDto: CreateSizeDto) {
    const color = this.sizeRepository.create(createSizeDto);
    return color;
  }

  async findAll() {
    return await this.sizeRepository.find();
  }

  async findOne(id: string) {
    const color = await this.sizeRepository.findOneBy({ id });
    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return color;
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    const color = await this.findOne(id);

    Object.assign(color, updateSizeDto);
    return color;
  }

  async remove(id: string) {
    const color = await this.findOne(id);
    await this.sizeRepository.delete(color);
  }
}
