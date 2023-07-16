import { Author } from "../authors/author.model";

export class Book {
    constructor(
        public id: string,
        public title: string,
        public author: Author,
        public description: string,
        public imageUrl: string,
        public required: boolean
    ) {}
}