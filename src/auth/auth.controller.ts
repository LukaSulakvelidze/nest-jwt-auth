import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { paginationDto } from './dto/pagination.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/users')
  @UseGuards(AuthGuard)
  getAllUser(@Query() queryParams: paginationDto) {
    return this.authService.getAllUser(queryParams);
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  getUser(@Req() request) {
    return this.authService.getCurrentUser(request.userId);
  }

  @Post('sign-up')
  signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.SignUp(CreateUserDto);
  }

  @Post('sign-in')
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.SignIn(SignInDto);
  }

  @Patch('users')
  @UseGuards(AuthGuard)
  update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(request.userId, updateUserDto);
  }

  @Delete('users')
  @UseGuards(AuthGuard)
  remove(@Req() request) {
    return this.authService.remove(request.userId);
  }
}
