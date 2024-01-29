import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private bookService: BookService, private catService: CategoryService,
              private router: Router, private toastr: ToastrService) {}

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
      this.toastr.success("El libro se creo correctamente!", 'Éxito');
      this.router.navigate(['/', 'crud'])
    });
  }
}
