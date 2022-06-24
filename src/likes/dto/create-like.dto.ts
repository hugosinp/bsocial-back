import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
	@IsNotEmpty()
	@IsString()
	post: string;
}
