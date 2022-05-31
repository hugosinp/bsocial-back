import { Post } from "src/posts/entities/post.entity";

export class User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    posts: Post[];
    role: string;
}
