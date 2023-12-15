import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit, OnChanges {
  @Input() categories: Category[] | any;
  @Input() formData: any;
  @Output() formSubmit = new EventEmitter<any>();

  bookForm: FormGroup | any;

  constructor(private fb: FormBuilder, private bookService: BookService, private catService: CategoryService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formData'] && changes['formData'].currentValue) {
      this.bookForm.patchValue(changes['formData'].currentValue);
    }
  }

   initializeForm() {
    this.bookForm = this.fb.group({
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

  onSubmit() {
    if (this.bookForm.valid) {
      this.formSubmit.emit(this.bookForm.value);
    }
  }
}
