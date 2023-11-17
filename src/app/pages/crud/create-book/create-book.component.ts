import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-book',
  templateUrl: `./create-book.component.html`,
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  categories: Category[] | any;

  createForm: FormGroup | any;

  constructor(private _bookService: BookService, private _catService: CategoryService, private fb: FormBuilder,
              private router: Router) {
    this.createForm = this.fb.group({
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

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._catService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  onCreateBook() {
    this._bookService.createBook(this.createForm.value).subscribe(res => {
      this.router.navigate(['/', 'crud'])
    });
  }
}
