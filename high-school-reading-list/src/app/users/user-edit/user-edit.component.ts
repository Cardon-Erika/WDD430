import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  originalUser: User;
  user: User;
  editMode: boolean = false;
  id: number;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if(this.id == null || !this.id) {
          this.editMode = false;
          return;
        }

        this.userService.getUser(this.id.toString())
          .subscribe(userData => {
            this.originalUser = userData.user;
            
            if(this.originalUser == null || !this.originalUser) {
              return
            }

            console.log("Edit True");
            this.editMode = true;
            this.user = JSON.parse(JSON.stringify(this.originalUser));
          });
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newUser = new User('', value.name);
    if(this.editMode) { 
      this.userService.updateUser(this.originalUser, newUser);
      console.log("Edit True User");
    } else {
      this.userService.addUser(newUser);
      console.log("Edit False User");
    }
    this.router.navigate(['/users']);
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

}
