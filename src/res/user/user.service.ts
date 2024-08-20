import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto/user.dto';
import { Response } from 'src/lib/common/utility/response';
import { RolesEnum } from 'src/lib/common/enum/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async updateUserAccount(data: UpdateUserDto, userId: string) {
    const user = await this.findById(userId);

    const { fullName, account_type, avatar, ...body } = data;
    Object.assign(user, { fullName, account_type, avatar });
    return Response.success(await this.userRepository.save(user));
  }

  async blockAndUnBlockAccount(id: string) {
    const user = await this.findById(id);
    user.is_account_blocked = !user.is_account_blocked;
    return Response.success(await this.userRepository.save(user));
  }

  async deleteUserAccount(userId: string) {
    await this.userRepository.delete(userId);
    return Response.success(null, 'Account successfully deleted');
  }

  async makeAdmin(userId: string) {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.roles = [RolesEnum.ADMIN];

    return await this.userRepository.save(user)

  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
