import { ApiProperty } from "@nestjs/swagger/dist";

import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVacationDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    period!: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsEnum(['1', '2']) // Ejemplo de estados
    recordType?: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    fechaInicio!: string; // Se recibe como string ISO date

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    fechaFinal?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    vacationDays!: string;

}
