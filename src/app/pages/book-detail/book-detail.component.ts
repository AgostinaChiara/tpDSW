import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl:'./book-detail.html',
  styleUrls: ['./book-detail.css']
})

export class BookDetailComponent implements OnInit {
  bookData: Book | any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.route.params.subscribe(params => { console.log(params)
        this.http.get<Book[]>('assets/books.json').subscribe(data => {
      this.bookData = data.find((each:any) => each.isbn === Number(params['isbn']));
    })
    
    })

  }
 
}
