import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookListComponent } from './pages/book-list/book-list/book-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { CrudComponent } from './pages/crud/crud.component';
import { UpdatePageComponent } from './pages/crud/update-book/update-book.component';
import { CreateBookComponent } from './pages/crud/create-book/create-book.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'list',
  component: BookListComponent
},
{
  path: 'list/:category',
  component: BookListComponent
},
{
  path: 'book/:isbn',
  component: BookDetailComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'crud',
  component: CrudComponent
},
{
  path: 'crud/create',
  component: CreateBookComponent
},
{
  path: 'update/:isbn',
  component: UpdatePageComponent
},
{
  path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

