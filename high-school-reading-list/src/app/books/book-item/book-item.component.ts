import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { AuthorService } from 'src/app/authors/author.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  bookAuthor: string;

  constructor(private authorService: AuthorService) {}
  
  ngOnInit() {
    this.authorService.getAuthor(this.book.author.id)
      .subscribe(
        authorData => {
          this.bookAuthor = authorData.author.name;
          // console.log(this.bookAuthor);
        }
      );
  }
}
