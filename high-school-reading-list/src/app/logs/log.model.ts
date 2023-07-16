import { Book } from "../books/book.model";
import { User } from "../users/user.model";

export class Log {
    constructor(
        public id: string,
        public user: User,
        public book: Book,
        public thoughts: string
    ) {}
}