import { User } from "src/users/entities/user.entity";

export class Post {
    id: string
    author: User;
    content: string
    createDate: Date;
    comments: Post[];
    parent: Post;
}
