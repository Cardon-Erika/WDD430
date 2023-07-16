import { Component, Input, OnInit } from '@angular/core';
import { Log } from '../log.model';
import { BookService } from 'src/app/books/book.service';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/users/user.model';
import { Subscription } from 'rxjs';
import { LogService } from '../log.service';
import { Book } from 'src/app/books/book.model';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.css']
})
export class LogItemComponent implements OnInit {
  // @Input() log: Log;
  @Input() user: User;
  bookRead: string;
  reader: string;
  logs: Log[] = [];
  private logSubscription: Subscription;
  requiredCount: number = 0;
  additionalCount: number = 0;
  private bookSubscription: Subscription;
  books: Book[] = [];
  userLogId: string;
  logByUser: Log[] = [];

  constructor(private bookService: BookService, private userService: UserService, private logService: LogService) {
    // console.log("Log Constructor: " + JSON.stringify(this.log));
    console.log("User Constructor: " + JSON.stringify(this.user));

  }

  ngOnInit(){
    // console.log("Log NgOnInit: " + JSON.stringify(this.log));
    // console.log("User Constructor: " + JSON.stringify(this.user));

    this.logSubscription = this.logService.logListChangedEvent
      .subscribe(
        (logList: Log[]) => {
          this.logs = logList;
          console.log("Logs: " + JSON.stringify(this.logs));

          for(let log of this.logs) {
            if(this.user.id === log.user.id) {
              this.logByUser.push(log);
              // console.log("Log By User: " +  JSON.stringify(this.logByUser));
            }
          }
        }
      );
      this.logService.getLogs();

    // list of this users logs = populate with getLogByUser();
    
    // this.logSubscription = this.logService.getLogByUser(this.user.id)
    //   .subscribe(
    //     logData => {
    //       console.log("Log Data: " + JSON.stringify(this.user.id))
    //       this.userLogId = logData.log.id;
    //       console.log("User Log Id: " + logData.log.id);
    //     }
    //   )

    // for(let log of this.logs) {
    //   if(this.user.id === log.user.id) {
    //     this.logByUser.push(log);
    //     console.log("Log By User: " +  JSON.stringify(this.logByUser));
    //   }
    // }

     
      
      this.bookSubscription = this.bookService.bookListChangedEvent
      .subscribe(
        (bookList: Book[]) => {
          this.books = bookList;
          // console.log("Book List: " + JSON.stringify(bookList));
          bookList.forEach(value => {
            // console.log("Value: " + JSON.stringify(value));
              if (value.required == true) {
                this.requiredCount++;
              } else {
                this.additionalCount++;
              }
            })
            console.log("Required Count: " + this.requiredCount);
            console.log("Additional Count: " + this.additionalCount);
          // bookList.filter()
            
          }
          )
        this.bookService.getBooks();

        // this.bookService.getBook(this.log.book.id)
        //   .subscribe(
        //     bookData => {
        //       this.bookRead = bookData.book.title;
        //       console.log("Book Read: " + this.bookRead);
        //     }
        //   )
    
        // this.userService.getUser(this.log.user.id)
        //     .subscribe(
        //       userData => {
        //         this.reader = userData.user.name;
        //         console.log("Reader: " + this.reader);
        //       }
        //     )
  }

  // ngAfterViewInit() {
  //   this.bookSubscription = this.bookService.bookListChangedEvent
  //   .subscribe(
  //     (bookList: Book[]) => {
  //       this.books = bookList;
  //       // console.log("Book List: " + JSON.stringify(bookList));
  //       bookList.forEach(value => {
  //         // console.log("Value: " + JSON.stringify(value));
  //           if (value.required == true) {
  //             this.requiredCount++;
  //           } else {
  //             this.additionalCount++;
  //           }
  //         })
  //         console.log("Required Count: " + this.requiredCount);
  //         console.log("Additional Count: " + this.additionalCount);
  //       // bookList.filter()
          
  //       }
  //       )
  //     this.bookService.getBooks();
  // }

  ngOnDestroy() {
    this.logSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }

}
