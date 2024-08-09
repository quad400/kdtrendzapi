import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto{
   @IsNotEmpty()
   @IsString()
   title: string;

   @IsString()
   parentId: string
}

export class CreateCategoryDto extends PartialType(CategoryDto){}