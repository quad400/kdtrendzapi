import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";


export class UserDto{
    @IsString()
    @IsNotEmpty()
    fullName: string;
    
    @IsString()
    @IsNotEmpty()
    avatar: string;
    
    @IsString()
    @IsNotEmpty()
    account_type: string;
}

export class UpdateUserDto extends PartialType(UserDto){}