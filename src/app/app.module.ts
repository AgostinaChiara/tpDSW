import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookComponent } from './components/books/book.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { BookListComponent } from './pages/book-list/book-list/book-list.component';
import { FeaturedBookComponent } from './components/featured-book/featured-book.component';
import { CartComponent } from './pages/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { BookService } from './services/book.service';
import { LoginComponent } from './pages/login/login.component';
import { CrudComponent } from './pages/crud/crud.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BookDetailComponent,
    BookComponent,
    FooterComponent,
    BookListComponent,
    FeaturedBookComponent,
    CartComponent,
    LoginComponent,
    CrudComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [CartService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
