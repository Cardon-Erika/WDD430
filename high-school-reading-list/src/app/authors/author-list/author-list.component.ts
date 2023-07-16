import { Component, OnInit } from '@angular/core';
import { Author } from '../author.model';
import { Subscription } from 'rxjs';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  private subscription: Subscription;

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.subscription = this.authorService.authorListChangedEvent
      .subscribe(
        (authorList: Author[]) => {
          this.authors = authorList;
        }
      );
      this.authorService.getAuthors();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
