import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

export abstract class BaseBookComponent {
  categories: Category[] | any;
  bookForm: FormGroup | any;

  constructor(
    protected bookService: BookService,
    protected categoryService: CategoryService,
    protected formBuilder: FormBuilder,
    protected router: Router
  ) {
    this.bookForm = this.formBuilder.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      year: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required],
      publisher: ['', Validators.required],
      cover: ['', Validators.required],
      pages: ['', Validators.required],
      language: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  abstract onSubmit(): void;

  getCategories() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }
}