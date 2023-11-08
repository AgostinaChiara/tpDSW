import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-crud',
  templateUrl: `./categories-crud.component.html`,
  styleUrls: ['./categories-crud.component.css']
})
export class CategoriesCrudComponent implements OnInit{
  categories: Category[] | any;
  page: number = 1;

  constructor(private _catService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._catService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  onDeleteCat(id: string) {
    if(confirm('Are you sure?')) {
      this._catService.deleteCategory(id).subscribe(res => {
        console.log(`Category with id ${id} has been deleted.`);
        this.categories = this.categories.filter((cat: Category) => cat.id !== id);
      })
    }
  }

}
