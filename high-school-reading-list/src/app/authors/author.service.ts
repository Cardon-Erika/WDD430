import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Author } from './author.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  authorSelectedEvent = new EventEmitter<Author>();
  authorListChangedEvent = new Subject<Author[]>();

  authors: Author[] = [];
  maxAuthorId: number;

  constructor(private http: HttpClient) {}

  sortAndSend() {
    this.authors.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.authorListChangedEvent.next(this.authors.slice());
  }

  getAuthors() {
    this.http
      .get<{ message: string, authors: Author[]}>('http://localhost:3000/authors')
      .subscribe(
        (responseData) => {
          this.authors = responseData.authors;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getAuthor(id: string) {
    // console.log(id);
    return this.http.get<{ message: String, author: Author }>('http://localhost:3000/authors/' + id);
  }

  addAuthor(author: Author) {
    if (author == null || !author) {
      return
    }

    console.log(author);

    author.id = "";

    const headers = new HttpHeaders({ "Content-Type": "application/json"});

    this.http.post<{ message: string, author: Author }>('http://localhost:3000/authors',
      author,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.authors.push(responseData.author);
          this.sortAndSend();
        }
      )
  }

  updateAuthor(originalAuthor: Author, newAuthor: Author) {
    if(!originalAuthor || originalAuthor == null || !newAuthor || newAuthor == null) {
      return
    }

    const pos = this.authors.findIndex(a => a.id === originalAuthor.id);
    if(pos < 0) {
      return;
    }

    console.log('POS - ' + pos);

    newAuthor.id = originalAuthor.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/authors/' + originalAuthor.id, newAuthor, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.authors[pos] = newAuthor;
          this.sortAndSend();
          console.log(response);
        }
      );
  }

  deleteAuthor(author: Author) {
    if(!author) {
      return;
    }

    const pos = this.authors.findIndex(a => a.id === author.id);
    if(pos < 0) {
      return;
    }

    console.log("Author Id: " + author.id);

    this.http.delete('http://localhost:3000/authors/' + author.id)
      .subscribe(
        (response: Response) => {
          this.authors.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

}
