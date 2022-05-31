import { User } from "src/users/entities/user.entity";

export class Message {
    id: string
    author: User;
    to: User[];
    content: string
    createDate: Date;
}
