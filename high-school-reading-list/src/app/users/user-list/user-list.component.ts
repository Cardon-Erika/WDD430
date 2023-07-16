import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  private subsciption: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subsciption = this.userService.userListChangedEvent
      .subscribe(
        (userList: User[]) => {
          this.users = userList;
        }
      );
      this.userService.getUsers();
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
  
}
