import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  selectedUser: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userSelectedEvent
      .subscribe((user: User) => {
        this.selectedUser = user;
      });
  }
}
