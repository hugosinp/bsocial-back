import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class LikeEntity {
	id: string;
	post: PostEntity;
	user: UserEntity;
}
