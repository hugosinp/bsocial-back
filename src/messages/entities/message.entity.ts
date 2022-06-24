import { UserEntity } from 'src/users/entities/user.entity';

export class Message {
	id: string;
	author: UserEntity;
	to: UserEntity[];
	content: string;
	createDate: Date;
}
