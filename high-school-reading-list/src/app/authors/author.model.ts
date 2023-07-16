import { Book } from "../books/book.model";

export class Author {
    constructor(
        public id: string,
        public name: string,
        public imageUrl: string,
        public books: Book []
    ) {}
}