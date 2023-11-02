import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private _bookService: BookService, private _catService: CategoryService, private fb: FormBuilder,) {
    this.createForm = this.fb.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      year: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
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
    console.log(this.createForm.value)
    this._bookService.createBook(this.createForm.value).subscribe(res => {
      console.log(this.createForm.value)
    });
  }
}
