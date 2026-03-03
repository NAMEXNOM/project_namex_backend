import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateConfigurationDto {
    
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    RH1_name: string;

    @IsEmail()
    RH1_email: string;

}
