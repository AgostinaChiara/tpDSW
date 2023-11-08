import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: `./create-category.component.html`,
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  createForm: FormGroup | any;

  constructor(private _catService: CategoryService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  
  }

  onCreateCategory() {
    this._catService.createCategory(this.createForm.value).subscribe(res => {
      this.router.navigate(['/', 'crudCategory'])
      console.log(this.createForm.value)
    });
  }
}
