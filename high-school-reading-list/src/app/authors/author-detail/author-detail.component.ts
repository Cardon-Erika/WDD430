import { Component, OnInit } from '@angular/core';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/books/book.model';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  author: Author;
  id: string;
  // books: Book[] = [];
  
  constructor(private authorService: AuthorService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.authorService.getAuthor(this.id)
            .subscribe(authorData => {
              this.author = authorData.author;
              // this.books = authorData.author.books;
              console.log(this.author);
              // console.log(this.books);
            })
        }
      )
  }

  onDelete() {
    this.authorService.deleteAuthor(this.author);
    this.router.navigateByUrl('/authors');
  }

}
