import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbg:any;
  inputText: string = '';
  categories: Category[] | any;

  constructor(private _categoryService: CategoryService, private _userService: UserService,
              private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  // Método para comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this._authService.isAuthenticatedUser();
  }

  // Método para comprobar si el usuario es un administrador
  isAdmin(): boolean {
    return this._authService.isAdminUser();
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    location.reload();
  }

  @Output()
  searchTextChanged:EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.inputText)
  }

  @HostListener('document:scroll') scrollover() {
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#ffffff'
      }
    }
  }
}
