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
import { CategoriesCrudComponent } from './pages/crud/categories-crud/categories-crud.component';
import { CreateCategoryComponent } from './pages/crud/categories-crud/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/crud/categories-crud/update-category/update-category.component';
import { AuthGuard } from './utils/auth.guard';

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
  component: CrudComponent,
  canActivate: [AuthGuard]
},
{
  path: 'crudCategory',
  component: CategoriesCrudComponent
},
{
  path: 'crud/create',
  component: CreateBookComponent
},
{
  path: 'crudCategory/create',
  component: CreateCategoryComponent
},
{
  path: 'update/:isbn',
  component: UpdatePageComponent
},
{
  path: 'updateCategory/:id',
  component: UpdateCategoryComponent
},
{
  path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

