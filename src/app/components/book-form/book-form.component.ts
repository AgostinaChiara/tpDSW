import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-book-form',
  template: `
    <div>hola</div>
  `,
  styles: [
  ]
})
export class BookFormComponent {
  @Input() formData: FormGroup | any;
  @Input() categories: Category[] | any;

  constructor(private fb: FormBuilder) {}
}
