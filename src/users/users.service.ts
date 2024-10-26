import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll(page: number, take: number) {
    return this.userModel
      .find()
      .skip((page - 1) * take)
      .limit(take);
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  findByEmail(query) {
    return this.userModel.findOne(query);
  }

  findByEmailWPass(query) {
    return this.userModel.findOne(query).select('+password');
  }
}
