import { EventEmitter, Injectable } from '@angular/core';
import { Book } from './book.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookSelectedEvent = new EventEmitter<Book>();
  bookListChangedEvent = new Subject<Book[]>();

  books: Book[] = [];
  // maxBookId: number;

  constructor(private http: HttpClient) {
    // this.maxBookId = this.getMaxId();
   }

  //  getMaxId() {
  //   let maxId = 0;
  //   for (let book of this.books) {
  //     const currentId = +book.id;
  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   }
  //   return maxId;
  //  }

  sortAndSend() {
    this.books.sort((a, b) => a.title > b.title ? 1 : b.title > a.title ? -1 : 0);
    this.bookListChangedEvent.next(this.books.slice());
  }

  getBooks() {
    this.http
      .get<{ message: string, books: Book[]}>('http://localhost:3000/books')
      .subscribe(
        (responseData) => {
          this.books = responseData.books;
          console.log(this.books);
          this.sortAndSend();
        },
      (error: any) => {
        console.log(error);
      }
      );
  }

  getBook(id: string) {
    return this.http.get<{ message: String, book: Book }>('http://localhost:3000/books/' + id);
  }

  addBook(book: Book) {
    if (book == null || !book) {
       return
    }

    book.id = "";

    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    this.http.post<{ message: string, book: Book }>('http://localhost:3000/books', 
      book,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.books.push(responseData.book);
          this.sortAndSend();
          // console.log("Response Data: " + responseData.book.id);
          // book.id = responseData.book.id;
          // return book.id;
          // console.log("Response Data: " + responseData.book.id);
        }
        );
        // return bookId;
  }

  updateBook(originalBook: Book, newBook: Book) {
    if(!originalBook || originalBook == null || !newBook || newBook == null) {
      return
    }

    const pos = this.books.findIndex(b => b.id === originalBook.id);
    if(pos < 0) {
      return
    }

    newBook.id = originalBook.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/books/' + originalBook.id, newBook, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.books[pos] = newBook;
          this.sortAndSend();
        }
      );
      // return newBook.id;
  }

  deleteBook(book: Book) {
    if(!book) {
      return
    }

    const pos = this.books.findIndex(b => b.id === book.id);
    if(pos < 0) {
      return
    }

    this.http.delete('http://localhost:3000/books/' + book.id)
      .subscribe(
        (response: Response) => {
          this.books.splice(pos, 1);
          this.sortAndSend();
        }
      )
  }

}
