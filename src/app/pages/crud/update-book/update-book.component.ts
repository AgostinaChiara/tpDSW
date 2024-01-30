import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-book',
  templateUrl: `./update-book.component.html`,
  styleUrls: ['./update-book.component.css']
})
export class UpdatePageComponent implements OnInit {
  categories: Category[] | any;
  isbn: string = '';
  bookData: any = {};

  constructor(
    private route: ActivatedRoute,
    private _bookService: BookService,
    private _catService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isbn = this.route.snapshot.params['isbn'];
    this.getCategories();
    this.getBookData();
  }

  getCategories() {
    this._catService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  getBookData() {
    this._bookService.getOne(this.isbn).subscribe((data) => {
      this.bookData = data;
    });
  }

  onUpdateBook(formData: any) {
    if (this.bookData.categoryId) {
      formData.categoryId = this.bookData.categoryId;
    }
    
    this._bookService.updateBook(this.isbn, formData).subscribe(() => {
      this.toastr.success("El libro se actualizo correctamente!", 'Éxito');
      this.router.navigate(['/', 'crud']);
    });
  }
}
