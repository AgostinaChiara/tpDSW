import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: `./create-category.component.html`,
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  createForm: FormGroup | any;

  constructor(private _catService: CategoryService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.createForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

   onCreateCategory() {
    this._catService.createCategory(this.createForm.value)
      .pipe(
        catchError((error: any) => {
          this.handleHttpError(error);
          return error;
        })
      )
      .subscribe(() => {
        this.toastr.success('Categoria creada con éxito!', 'Categoria creada');
        this.router.navigate(['/', 'crudCategory']);
      });
  }

   private handleHttpError(error: any): void {
    if (error.status === 400) {
      this.toastr.error('Error de validación. Verifique los datos ingresados.', 'Error');
    } else if (error.status === 500) {
      this.toastr.error('Error del servidor. Comuníquese con el administrador.', 'Error');
    } else {
      this.toastr.error('Error inesperado. Comuníquese con el administrador.', 'Error');
    }
  }
}
