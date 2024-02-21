import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(books: Book[], sort: string): Book[] {
    if (!books || !sort) {
      return books;
    }

    switch (sort) {
      case 'nameAsc':
        return books.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'nameDesc':
        return books.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'lowerPrice':
        return books.slice().sort((a, b) => a.price - b.price);
      case 'higherPrice':
        return books.slice().sort((a, b) => b.price - a.price);
      default:
        return books;
    }
  }

}
