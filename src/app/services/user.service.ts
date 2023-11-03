import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'users/'
  }

  //Registrar un nuevo usuario
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/users/register`, user)
  }

  //Iniciar sesion
  loginUser(userLogin: any): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/users/login`, userLogin)
  }
}
