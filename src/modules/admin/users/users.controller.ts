import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  //inyeccion de dependencia
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log("Guardando en controlador ... ",createUserDto)
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userRFC')
  findOne(@Param('userRFC') userRFC: string) {
    return this.usersService.findOne(userRFC);
  }

  @Patch(':userRFC')
  update(@Param('userRFC') userRFC: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userRFC, updateUserDto);
  }

  @Delete(':userRFC')
  remove(@Param('userRFC') userRFC: string) {
    return this.usersService.remove(userRFC);
  }
}
