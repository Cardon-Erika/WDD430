import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  id: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.userService.getUser(this.id)
            .subscribe(userData => {
              this.user = userData.user;
            });
        }
      );
  }

  onDelete() {
    this.userService.deleteUser(this.user);
    this.router.navigateByUrl('/users');
  }
}
