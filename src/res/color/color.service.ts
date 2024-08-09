import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorEntity } from './entities/color.entity';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private colorRepository: Repository<ColorEntity>,
  ) {}

  async create(createColorDto: CreateColorDto) {
    await this.findUnique(createColorDto.name);
    let color = this.colorRepository.create(createColorDto);
    return await this.colorRepository.save(color);
  }

  async findAll() {
    return await this.colorRepository.find();
  }

  async findOne(id: string) {
    const color = await this.colorRepository.findOneBy({ id });
    console.log(color)
    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return color;
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    const color = await this.findOne(id);
    await this.findUnique(updateColorDto.name);
    const setColor = Object.assign(color, updateColorDto);
    return await this.colorRepository.save(setColor);
  }

  async findUnique(name: string) {
    const isExist = await this.colorRepository.findOneBy({
      name,
    });
    if (isExist) {
      throw new ConflictException(`Color name  "${name}" already exists`);
    }
  }

  async remove(id: string) {
    const color = await this.findOne(id);
    return await this.colorRepository.delete(color);
  }
}
