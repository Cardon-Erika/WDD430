import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Author } from 'src/app/authors/author.model';
import { AuthorService } from 'src/app/authors/author.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  originalBook: Book;
  book: Book;
  editMode: boolean = false;
  id: number;
  authors: Author[] = []; //
  private authorSubscription: Subscription;
  // private bookSubscription: Subscription;
  bookAuthor: Author;
  originalAuthor: Author;
  bookListofAuthor: Book[] = [];
  books: Book[] = [];
  updatedBookList: Book[] = [];
  bookId: string;


  
  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute, private authorService: AuthorService, private http: HttpClient) {}

  ngOnInit() {
    this.authorSubscription = this.authorService.authorListChangedEvent
      .subscribe(
        (authorList: Author[]) => {
          this.authors = authorList;
        }
      );
      this.authorService.getAuthors();

    console.log()

    // this.authorService.getAuthor(this.author.id)
    //     .subscribe(
    //       response => {
    //         this.bookAuthor = response.author
    //       }
    //     )

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id == null || !this.id) {
          this.editMode = false;
          console.log('Edit False');
          return;
        }
        this.bookService.getBook(this.id.toString())
          .subscribe(bookData => {
            this.originalBook = bookData.book;

            if (this.originalBook == null || !this.originalBook) {
              return;
            }

            console.log('Edit True');
            this.editMode = true;
            this.book = JSON.parse(JSON.stringify(this.originalBook));
            console.log("Book " + this.book.id + this.book);
          })
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    // console.log(value.author);
    this.authorService.getAuthor(value.author)
      .subscribe(
        response => {
          this.bookAuthor = response.author;

          // console.log("Book Author" + JSON.stringify(this.bookAuthor));
          console.log('Value: ' + JSON.stringify(value));
          // const newBook = new Book('', value.title, value.author, value.description, value.imageUrl, value.bkRequired);
          const newBook = new Book('', value.title, this.bookAuthor, value.description, value.imageUrl, value.bkRequired);
          // this.bookService.updateBook(this.originalBook, newBook);
          // console.log("New Author: " + JSON.stringify(newAuthor));
          if(this.editMode) {
            // this.bookId = this.bookService.updateBook(this.originalBook, newBook);
            this.bookService.updateBook(this.originalBook, newBook);
            // this.authorService.updateAuthor(this.originalAuthor, newAuthor);
            console.log('Edit Book True');
            // console.log("Book Id: " + this.bookId);
          } else {
            this.bookService.addBook(newBook);

            // this.bookSubscription = this.bookService.bookListChangedEvent
            // .subscribe(
            //   (bookList: Book[]) => {
            //     this.books = bookList;
            //   }
            // );
            // this.bookService.getBooks2();
            // const newBookWithId = this.books.findIndex(i => i.title === value.title);
            // console.log("I" + i);
            // console.log("Value Title: " + value.title);
            // console.log("New Book WIth Id " + newBookWithId);

            // const sequence = this.http.get<{ message: String, sequence: Sequence }>('http://localhost:3000/sequences/');

            // this.bookId

            // this.authorService.updateAuthor(this.originalAuthor, newAuthor);
            // console.log(newBook);
            console.log('Edit Book False');
            // console.log("Book Id: " + JSON.stringify(updatedBookList));
            
          }
          
        // },
        // ()=>{},
        // ()=> {

        //   console.log("Title: " + value.title);
        //   const newBookWithId = this.books.findIndex(i => i.id === this.bookId);
        //   // const newTitle = this.bookService.getBookByTitle(newBook.title);
        //   // console.log("Book List: " + JSON.stringify(this.books));
        //   console.log("Returned Book: " + JSON.stringify(newBookWithId));
        //   // console.log("New Id: " + JSON.stringify(newTitle));
        //   this.bookListofAuthor.push(value);
        //   const newAuthor = new Author('', null, null, this.bookListofAuthor);
        //   this.authorService.updateAuthor(this.originalAuthor, newAuthor);
        
      }
      );
        this.router.navigate(['/books']);
  }

  onCancel() {
    this.router.navigate(['/books']);
  }

  ngOnDestroy() {
    this.authorSubscription.unsubscribe();
    // this.bookSubscription.unsubscribe();
  }
}
