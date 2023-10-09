import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bookprueba } from 'src/app/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Bookprueba | any;

  
  constructor(private activatedRoute: ActivatedRoute) {}
  isbn: number = 0;
  ngOnInit(): void {
    this.isbn = this.activatedRoute.snapshot.params['isbn'];
  }
}
