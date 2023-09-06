import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books = [
      {
        title: 'Harry potter',
        author: 'J K Rowling',
        year: 2008,
      },
      {
        title: 'Lord of the rings',
        author: 'J R R Tolkien',
        year: 1960,
      },
      {
        title: 'Fundacion',
        author: 'Isaac Asimov',
        year: 1970,
      },
  ]
}
