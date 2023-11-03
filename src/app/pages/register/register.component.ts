import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: `./register.component.html`,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup | any;

  constructor(private route: ActivatedRoute, private _userService: UserService,  private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    try {
      if (this.registerForm.valid) {
        const userData = this.registerForm.value;

        userData.role = 'user';
        console.log(userData)
        this._userService.registerUser(userData).subscribe({
          next: (data) => {
            console.log("User Registration complete!", data)
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
