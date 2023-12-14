import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup | any;

  constructor(private router: Router, private _userService: UserService,  private fb: FormBuilder,
              private toastr: ToastrService, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._userService.loginUser(this.loginForm.value).subscribe({
        next: (token) => {
          this.authService.setToken(token);
          this.toastr.success('El usuario fue registrado con exito', 'Usuario registrado')
          this.router.navigate(['/'])
        },
        error: (error) => {
          this.toastr.error('Ocurrio un error!', 'Error')
        }
      });
    }
  }
}
