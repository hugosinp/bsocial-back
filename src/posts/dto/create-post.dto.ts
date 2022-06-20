import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    content: string;
  
    @IsOptional()
    @IsString()
    parent: string;
}
