import { Component, OnInit } from '@angular/core';
import { Log } from '../log.model';
import { LogService } from '../log.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/users/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/user.model';
import { Book } from 'src/app/books/book.model';
import { BookService } from 'src/app/books/book.service';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.css']
})
export class LogEditComponent implements OnInit {
  originalLog: Log;
  log: Log;
  editMode: boolean = false;
  id: number;
  users: User[] = [];
  books: Book[] = [];
  private userSubscription: Subscription;
  private bookSubscription: Subscription;
  bookRead: Book;
  reader: User;

  constructor(private logService: LogService, private userService: UserService, private bookService: BookService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userSubscription = this.userService.userListChangedEvent
    .subscribe(
      (userList: User[]) => {
        this.users = userList;
      }
    );
    this.userService.getUsers();

    this.bookSubscription = this.bookService.bookListChangedEvent
    .subscribe(
      (bookList: Book[]) => {
        this.books = bookList;
      }
    );
    this.bookService.getBooks();


    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(this.id == null || !this.id) {
          this.editMode = false;
          return;
        }

        this.logService.getLog(this.id.toString())
          .subscribe(logData => {
            this.originalLog = logData.log;

            if(this.originalLog == null || !this.originalLog) {
              return
            }

            console.log("Edit True");
            this.editMode = true;
            this.log = JSON.parse(JSON.stringify(this.originalLog));
          });
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    this.userService.getUser(value.user)
      .subscribe(
        response1 => {
          console.log("Response 1: " + JSON.stringify(response1));
          this.reader = response1.user;

          this.bookService.getBook(value.book)
            .subscribe(
              response2 => {
                console.log("Response 2: " + JSON.stringify(response2));
                this.bookRead = response2.book

                // console.log("Value: " + JSON.stringify(value));
                // console.log("Reader: " + JSON.stringify(this.reader));
                // console.log("Book read: " + JSON.stringify(this.bookRead));
                
                const newLog = new Log('', this.reader, this.bookRead, value.thoughts);
                console.log("New Log: " + JSON.stringify(newLog));
                if(this.editMode) {
                  this.logService.updateLog(this.originalLog, newLog);
                  console.log("Edit Log True");
                } else {
                  this.logService.addLog(newLog);
                  console.log("Edit Log False");
                }
              }
            )
        }
      )

    this.router.navigate(['/logs']);
  }

  onCancel() {
    this.router.navigate(['/logs']);
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
