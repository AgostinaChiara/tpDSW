import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, forkJoin, of } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: `./update-category.component.html`,
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  categoryData: Category | any;
  id: number = 0;

  updateForm: FormGroup | any;

  constructor(private route:ActivatedRoute, private _catService: CategoryService, 
              private fb: FormBuilder, private router: Router) {
    this.updateForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getCategory(this.id);
  }

  getCategory(id: number) {
    this._catService.getOne(id).subscribe((data) => {
      this.categoryData = data;
      this.updateForm.patchValue(this.categoryData);
    })
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this._catService.updateCategory(this.id, this.updateForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/', 'crudCategory'])
        },
        error: (error) => {
          console.error("Something went wrong", error)
        }
      });
    }
  }
}
