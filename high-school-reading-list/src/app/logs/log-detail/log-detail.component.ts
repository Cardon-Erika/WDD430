import { Component, OnInit } from '@angular/core';
import { Log } from '../log.model';
import { LogService } from '../log.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookService } from 'src/app/books/book.service';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent implements OnInit {
  log: Log;
  id: string;
  bookAuthor: string;

  constructor(private logService: LogService, private router: Router, private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.logService.getLog(this.id)
        .subscribe(logData => {
          this.log = logData.log;

          this.bookService.getBook(this.log.book.id)
                .subscribe(
                  bookData => {
                    // console.log("Book Data: " + JSON.stringify(bookData));
                    this.bookAuthor = bookData.book.author.name;
                    // console.log("Book Author: " + this.bookAuthor);
                  }
                )
        });
      }
      );

  }

  onDelete() {
    this.logService.deleteLog(this.log);
    this.router.navigateByUrl('/logs');
  }

}
