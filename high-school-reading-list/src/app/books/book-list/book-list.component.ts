import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { Subscription } from 'rxjs';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  private subscription: Subscription;

  constructor(private bookService: BookService) {}

  ngOnInit() {
      this.subscription = this.bookService.bookListChangedEvent
        .subscribe(
          (bookList: Book[]) => {
            this.books = bookList;
          }
        );
        this.bookService.getBooks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
