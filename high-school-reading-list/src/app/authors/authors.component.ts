import { Component, OnInit } from '@angular/core';
import { Author } from './author.model';
import { AuthorService } from './author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  selectedAuthor: Author;

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
   this.authorService.authorSelectedEvent
    .subscribe((author: Author) => {
      this.selectedAuthor = author;
    });
  }

}
