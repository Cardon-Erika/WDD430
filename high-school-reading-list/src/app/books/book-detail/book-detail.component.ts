import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: string;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.bookService.getBook(this.id)
            .subscribe(bookData => {
              console.log(bookData.book);
              this.book = bookData.book;
            });
        }
      );
  }

  onDelete() {
    this.bookService.deleteBook(this.book);
    this.router.navigateByUrl('/books');
  }

}
