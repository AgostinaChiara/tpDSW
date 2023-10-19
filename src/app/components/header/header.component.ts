import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbg:any;
  inputText: string = '';
  categories: Category[] | any;

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  @Output()
  searchTextChanged:EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.inputText)
  }

  @HostListener('document:scroll') scrollover() {
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#ffffff'
      }
    }
  }
}
