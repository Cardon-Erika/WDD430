import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookItemComponent } from './books/book-item/book-item.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorItemComponent } from './authors/author-item/author-item.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { LogsComponent } from './logs/logs.component';
import { LogListComponent } from './logs/log-list/log-list.component';
import { LogItemComponent } from './logs/log-item/log-item.component';
import { LogEditComponent } from './logs/log-edit/log-edit.component';
import { LogDetailComponent } from './logs/log-detail/log-detail.component';
import { HomeComponent } from './home/home.component';
// import { DndModule } from 'ng2-dnd';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksComponent,
    AuthorsComponent,
    BookListComponent,
    BookItemComponent,
    BookEditComponent,
    BookDetailComponent,
    AuthorListComponent,
    AuthorItemComponent,
    AuthorEditComponent,
    AuthorDetailComponent,
    UsersComponent,
    UserDetailComponent,
    UserEditComponent,
    UserItemComponent,
    UserListComponent,
    LogsComponent,
    LogListComponent,
    LogItemComponent,
    LogEditComponent,
    LogDetailComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
