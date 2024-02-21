import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book.model';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(books: Book[], searchText: string): Book[] {
    if (!books || !searchText) {
      return books;
    }

    searchText = searchText.toLowerCase();

    return books.filter(book => book.title.toLowerCase().includes(searchText));
  }

}
