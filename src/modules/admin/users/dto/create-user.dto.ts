import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {  //que es lo que queremos guardar, es lo que debemos poner en esta clase
    @IsString()
    @MinLength(13)
    @MaxLength(13)
    @IsNotEmpty()
    userRFC: string;

    @IsString()
    @IsNotEmpty()
    empNumber: string;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsNotEmpty()
    firstLastName: string;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsNotEmpty()
    secondLastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Type(() => Date) // 1. Convierte el string del JSON a objeto Date
    @IsDate()         // 2. Valida que sea una fecha válida
    hireDate: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    termDate?: Date;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    shiftType: string;

    @IsString()
    @IsNotEmpty()
    jobRole: string;

    @IsBoolean()
    @IsNotEmpty()
    firstTimeLoad: boolean;

    @IsString()
    @IsNotEmpty()
    password: string;

}
