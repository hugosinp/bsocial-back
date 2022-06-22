import { UserEntity } from "src/users/entities/user.entity";

export class PostEntity {
    id: string
    author: UserEntity;
    content: string
    createDate: Date;
    comments: PostEntity[];
    parent: PostEntity;
}
