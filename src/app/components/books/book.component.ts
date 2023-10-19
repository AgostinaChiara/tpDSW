import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book | any;

  constructor(private activatedRoute: ActivatedRoute) {}
  isbn: number = 0;
  ngOnInit(): void {
    this.isbn = this.activatedRoute.snapshot.params['isbn'];
  }
}
