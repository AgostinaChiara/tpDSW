import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookListComponent } from './pages/book-list/book-list/book-list.component';
import { CartComponent } from './pages/cart/cart.component';

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
  path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

