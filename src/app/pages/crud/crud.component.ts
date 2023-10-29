import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book.model';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-crud',
  templateUrl: `./crud.component.html`,
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  books: Book[] | any;
  selectedBook: Book | any;
  categories: Category[] | any;
  page: number = 1;

  createForm: FormGroup | any;
  updateForm: FormGroup | any;

  constructor(private _bookService: BookService, private _catService: CategoryService, private fb: FormBuilder) {
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

    this.updateForm = this.fb.group({
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
    })
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
  }

  getBooks() {
    this._bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  getBook(isbn: string) {
    this._bookService.getOne(isbn).subscribe((data) => {
      this.selectedBook = data
    })
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

  onUpdateBook() {
    console.log(this.updateForm.value)
  }
}
