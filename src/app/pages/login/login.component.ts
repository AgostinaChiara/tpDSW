import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup | any;

  constructor(private route: ActivatedRoute, private _userService: UserService,  private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    try {
      if (this.loginForm.valid) {
        this._userService.loginUser(this.loginForm.value).subscribe({
          next: (data) => {
            console.log("Loggin in..", data)
          },
          error: (error) => {
            console.error("Something went wrong", error)
          }
        });
      }
    } catch(error) {
      console.error('error', error);
    }
  }
}
