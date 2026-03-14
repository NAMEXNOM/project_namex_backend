import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){


  }

  create(createUserDto: CreateUserDto) {
    console.log("Guardando en servicio ... ", createUserDto);
    const nuevoUser = this.userRepository.create(createUserDto);
    this.userRepository.save(nuevoUser);
    return nuevoUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(userRFC: string) {
    const user = await this.userRepository.findOneBy({userRFC});
    if (!user) throw new NotFoundException('El usuario no existe');
    return user;
  }

  async update(userRFC: string, updateUserDto: UpdateUserDto) {
  //  const user = await this.userRepository.findOneBy({userRFC}); para no repetir, se puede llamar a la función findOne() antes configurada
    const user = await this.findOne(userRFC);
    this.userRepository.merge(user, updateUserDto)

    return this.userRepository.save(user);
  }

  async remove(userRFC: string) {
    const result = await this.userRepository.delete({userRFC});
    // validacion para saber si se realizo algun cambio, si el registro no se afectó, entonces lanza una exepción de que el usuario no existe. Todo se maneja por 
    if (result.affected === 0) throw new NotFoundException("El usuario no existe")
  }
}
