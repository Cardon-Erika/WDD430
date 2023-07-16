import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { LogsComponent } from './logs/logs.component';
import { LogEditComponent } from './logs/log-edit/log-edit.component';
import { LogDetailComponent } from './logs/log-detail/log-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: '', redirectTo: 'authors', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BooksComponent, children: [
    { path: 'new', component: BookEditComponent },
    { path: ':id', component: BookDetailComponent },
    { path: ':id/edit', component: BookEditComponent }
  ] },
  { path: 'authors', component: AuthorsComponent, children: [
    { path: 'new', component: AuthorEditComponent },
    { path: ':id', component: AuthorDetailComponent },
    { path: ':id/edit', component: AuthorEditComponent }
  ] },
  { path: 'users', component: UsersComponent, children: [
    { path: 'new', component: UserEditComponent },
    { path: ':id', component: UserDetailComponent },
    { path: ':id/edit', component: UserEditComponent }
  ] },
  { path: 'logs', component: LogsComponent, children: [
    { path: 'new', component: LogEditComponent },
    { path: ':id', component: LogDetailComponent },
    { path: ':id/edit', component: LogEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
