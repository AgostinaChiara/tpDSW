import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';

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
  submitted = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formData'] && changes['formData'].currentValue) {
      this.bookForm.patchValue(changes['formData'].currentValue);
    }
  }

   initializeForm() {
    this.submitted = false;
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
      pages: [''],
      language: [''],
      description: [''],
      stock: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Set the image URL directly, assuming the file is an image
      this.bookForm.patchValue({
        image: URL.createObjectURL(file),
        file: file,
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.bookForm.valid) {
      const formData = new FormData();
      formData.append('isbn', this.bookForm.get('isbn').value);
      formData.append('title', this.bookForm.get('title').value);
      formData.append('year', this.bookForm.get('year').value);
      formData.append('author', this.bookForm.get('author').value);
      const fileControl = this.bookForm.get('file');
      if (fileControl) {
        formData.append('file', fileControl.value);
      }
      formData.append('price', this.bookForm.get('price').value);
      formData.append('categoryId', this.bookForm.get('categoryId').value);
      formData.append('publisher', this.bookForm.get('publisher').value);
      formData.append('cover', this.bookForm.get('cover').value);
      formData.append('pages', this.bookForm.get('pages').value);
      formData.append('language', this.bookForm.get('language').value);
      formData.append('description', this.bookForm.get('description').value);
      formData.append('stock', this.bookForm.get('stock').value);

      this.formSubmit.emit(formData);
    } else {
      this.toastr.error('Por favor, complete todos los campos requeridos.', 'Error')
    }
  } 
}
