import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){


  }

  async create(createUserDto: CreateUserDto) {
    console.log("Guardando en servicio ... ", createUserDto);
    
  //  const nuevoUser = this.userRepository.create(createUserDto);

    const existeRFC = await this.userRepository.findOne({where: {userRFC: createUserDto.userRFC}})

    if (existeRFC){
      throw new BadRequestException(`El RFC ${createUserDto.userRFC} ya está en uso`);
    }

    const existeEmail = await this.userRepository.findOne({where: {email: createUserDto.email}})

    if (existeEmail){
      throw new BadRequestException(`El email ${createUserDto.email} ya está en uso`);
    }

    const existeEmpNumber = await this.userRepository.findOne({where: {empNumber: createUserDto.empNumber}})

    if (existeEmpNumber){
      throw new BadRequestException(`El numero de empleado ${createUserDto.empNumber} ya está en uso`);
    }

    // cifrar encriptar
    const hashPassword = await bcrypt.hash(createUserDto.password, 12);  // lo vamos a encriptar usando saltround con 12 saltos

    const newUser = this.userRepository.create({
      userRFC: createUserDto.userRFC,
      empNumber: createUserDto.empNumber,
      name: createUserDto.name,
      firstLastName: createUserDto.firstLastName,
      secondLastName: createUserDto.secondLastName,
      email: createUserDto.email,
      hireDate: createUserDto.hireDate,
      termDate: createUserDto.termDate,
      status: createUserDto.status,
      shiftType: createUserDto.shiftType,
      jobRole: createUserDto.jobRole,
      firstTimeLoad: createUserDto.firstTimeLoad,
      password: hashPassword
    })

    this.userRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(userRFC: string) {
    const user = await this.userRepository.findOneBy({userRFC});
    if (!user) throw new NotFoundException('El usuario no existe');
    return user;
  }

  async findOneByRfc(userRFC: string) {
  return await this.userRepository.findOne({
    where: { userRFC },
    relations: ['roles'], // Esto hace el "Join" automático con la tabla roles
  });
 }

//Debemos crear para la authenticacion una función para buscar por RFC
/*  async findOneByRfc(userRFC: string){
    const user = await this.userRepository.findOneBy({userRFC})
    if (!user) throw new NotFoundException(`El susuario con RFC: ${userRFC} no existe`)
      return user;
  }*/
  
// backend/src/users/users.service.ts


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
