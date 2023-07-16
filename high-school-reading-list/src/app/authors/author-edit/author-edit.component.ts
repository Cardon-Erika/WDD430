import { Component, OnInit } from '@angular/core';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/books/book.model';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  originalAuthor: Author;
  author: Author;
  editMode: boolean = false;
  id: number;
  authors: Author[] = [] ;
  private subscription: Subscription;
  bookListofAuthor: Book [] = [];
 
  constructor(private authorService: AuthorService, private router: Router, private route: ActivatedRoute) {}

 ngOnInit() {
  this.subscription = this.authorService.authorListChangedEvent
  .subscribe(
    (authorList: Author[]) => {
      this.authors = authorList;
    }
  );
  this.authorService.getAuthors();

   this.route.params.subscribe(
    (params: Params) => {
      this.id = params['id'];
      if (this.id == null || !this.id) {
        this.editMode = false;
        console.log('Edit False');
        return
      }
      this.authorService.getAuthor(this.id.toString())
        .subscribe(authorData => {
          this.originalAuthor = authorData.author;

          if (this.originalAuthor == null || !this.originalAuthor) {
            return;
          }

          this.editMode = true;
          this.author = JSON.parse(JSON.stringify(this.originalAuthor));
        })
    }
   )
 }

 onSubmit(form: NgForm) {
  const value = form.value;
  // console.log('Value: ' + JSON.stringify(value ));
  const newAuthor = new Author('', value.name, value.imageUrl, this.bookListofAuthor);
  console.log('Value: ' + JSON.stringify(newAuthor));

  if(this.editMode) {
    this.authorService.updateAuthor(this.originalAuthor, newAuthor);
    // console.log("Original Author: " + this.originalAuthor);
    // console.log("New Author: " + newAuthor);
    console.log('Edit Author True');
  } else {
    // Check if Author is already in list
    const indexOfAuthorName = this.authors.findIndex(i => i.name === value.name);
    // console.log("Value Name: " + value.name);
    // console.log("Authors: " + this.authors);
    // console.log(" Index of Author Name: " + indexOfAuthorName);
    if(indexOfAuthorName >= 0) {
      alert( value.name + " is already in your list!");
      form.reset();
      return;
    }

    this.authorService.addAuthor(newAuthor);
    console.log('Edit Author False');
  }
  this.router.navigate(['/authors']);
 }

 onCancel() {
  this.router.navigate(['/authors']);
 }

 ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
