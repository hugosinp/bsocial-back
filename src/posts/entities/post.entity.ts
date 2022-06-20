import { UserEntity } from "src/users/entities/user.entity";

export class Post {
    id: string
    author: UserEntity;
    content: string
    createDate: Date;
    comments: Post[];
    parent: Post;
}
