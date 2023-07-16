import { EventEmitter, Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSelectedEvent = new EventEmitter<User>();
  userListChangedEvent = new Subject<User[]>();

  users: User[] = [];
  maxUserId: number;

  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.users.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.userListChangedEvent.next(this.users.slice());
  }

  getUsers() {
    this.http
      .get<{ message: string, users: User[] }>('http://localhost:3000/users')
      .subscribe(
        (responseData) => {
          this.users = responseData.users;
          console.log(this.users);
          this.sortAndSend();
        },
        (error:any) => {
          console.log(error);
        }
      );
  }

  getUser(id: string) {
    return this.http.get<{ message: string, user: User }>('http://localhost:3000/users/' + id);
  }

  addUser(user: User) {
    if (user == null || !user) {
      return
    }

    // console.log(user);

    user.id = "";

    const headers = new HttpHeaders({ "Content-Type": "application/json"});

    this.http.post<{ message: string, user: User }>('http://localhost:3000/users',
      user,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.users.push(responseData.user);
          this.sortAndSend();
          console.log("REsponse Data: " + JSON.stringify(responseData));
        }
      )
  }

  updateUser(originalUser: User, newUser: User) {
    if(!originalUser || originalUser == null || !newUser || newUser == null) {
      return
    }

    const pos = this.users.findIndex(a => a.id === originalUser.id);
    if(pos < 0) {
      return;
    }

    console.log('POS - ' + pos);

    newUser.id = originalUser.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/users/' + originalUser.id, newUser, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.users[pos] = newUser;
          this.sortAndSend();
          console.log(response);
        }
      );
  }

  deleteUser(user: User) {
    if(!user) {
      return;
    }

    const pos = this.users.findIndex(a => a.id === user.id);
    if(pos < 0) {
      return;
    }

    console.log("User Id: " + user.id);

    this.http.delete('http://localhost:3000/users/' + user.id)
      .subscribe(
        (response: Response) => {
          this.users.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

}
