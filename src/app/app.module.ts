import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';

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
import { UpdatePageComponent } from './pages/crud/update-book/update-book.component';
import { CreateBookComponent } from './pages/crud/create-book/create-book.component';
import { RegisterComponent } from './pages/register/register.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { CategoriesCrudComponent } from './pages/crud/categories-crud/categories-crud.component';
import { CreateCategoryComponent } from './pages/crud/categories-crud/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/crud/categories-crud/update-category/update-category.component';
import { FormComponent } from './pages/crud/form/form.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterNamePipe } from './pipes/filter-name.pipe';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { OrderChartsComponent } from './pages/order-charts/order-charts.component';
import { FinishOrderComponent } from './pages/finish-order/finish-order.component';


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
    UpdatePageComponent,
    CreateBookComponent,
    RegisterComponent,
    SpinnerComponent,
    CategoriesCrudComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    FormComponent,
    OrderByPipe,
    FilterNamePipe,
    DoughnutChartComponent,
    OrderChartsComponent,
    FinishOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    }),
    NgSelectModule,
    NgChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    { provide: NgChartsConfiguration, useValue: { generateColors: false }},
    CartService, 
    BookService, 
    BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
