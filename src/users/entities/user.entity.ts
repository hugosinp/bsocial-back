import { Post } from "src/posts/entities/post.entity";

export class UserEntity {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    roles: string[];
    posts: Post[];
}
