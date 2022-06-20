import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    to: string;
  
    @IsNotEmpty()
    @IsString()
    content: string;
}
