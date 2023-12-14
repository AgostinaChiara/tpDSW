import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-book',
  templateUrl: `./update-book.component.html`,
  styleUrls: ['./update-book.component.css']
})
export class UpdatePageComponent implements OnInit {
  bookData: Book | any = {};
  categoryData: Category | any;
  categories: Category[] | any;
  isbn: string = '';

  updateForm: FormGroup | any;

  cat$: Observable<Category[]> | undefined;
  selectedCatId: number = 0;

  constructor(private route: ActivatedRoute, private _bookService: BookService, private _catService: CategoryService, 
              private fb: FormBuilder, private router: Router) {
    this.updateForm = this.fb.group({
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
    })
  }

  ngOnInit() {
    this.isbn = this.route.snapshot.params['isbn'];
    this.getCategories();
    this.getBook();
    this.cat$ = this._catService.getCategory();
  }

  getBook() {
    this._bookService
      .getOne(this.isbn)
      .pipe(
        switchMap((bookData) => {
          return forkJoin({
            bookData: of(bookData),
            categoryData: this._catService.getOne(bookData.categoryId)
          });
        })
      )
      .subscribe((data) => {
        this.bookData = data.bookData;
        this.categoryData = data.categoryData;
        this.selectedCatId = data.categoryData.id;

        this.updateForm.patchValue(this.bookData);
      });
  }

  getCategories() {
    this._catService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  getCategory(id: number) {
    this._catService.getOne(id).subscribe((data) => {
      this.categoryData = data;
    })
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this._bookService.updateBook(this.isbn, this.updateForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/', 'crud'])
        },
        error: (error) => {
          console.error("Something went wrong", error)
        }
      });
    }
  }
}
