import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;

  // Método para establecer el estado de autenticación y el rol
  setAuth(isAuthenticated: boolean, isAdmin: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.isAdmin = isAdmin;
  }

  // Método para obtener el estado de autenticación
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  // Método para obtener el rol del usuario
  isAdminUser(): boolean {
    return this.isAdmin;
  }
}
