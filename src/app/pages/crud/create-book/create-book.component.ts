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

  constructor(private bookService: BookService, private catService: CategoryService, private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.catService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  onCreateBook(formData: FormData) {
    this.bookService.createBook(formData).subscribe(res => {
      this.router.navigate(['/', 'crud'])
    });
  }
}
