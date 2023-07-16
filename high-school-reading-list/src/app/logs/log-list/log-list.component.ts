import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from '../log.service';
import { Log } from '../log.model';
import { User } from 'src/app/users/user.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {
  // logs: Log[] = [];
  users: User[] = [];
  // private logSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(private logService: LogService, private userService: UserService) {}

  ngOnInit() {
    // this.logSubscription = this.logService.logListChangedEvent
    //   .subscribe(
    //     (logList: Log[]) => {
    //       this.logs = logList;
    //     }
    //   );
    //   this.logService.getLogs();

      this.userSubscription = this.userService.userListChangedEvent
      .subscribe(
        (userList: User[]) => {
          // console.log("User List: " + JSON.stringify(userList));
          this.users = userList;
        }
      );
      this.userService.getUsers();
  }

  ngOnDestroy() {
    // this.logSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
