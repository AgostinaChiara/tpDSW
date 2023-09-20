import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book:any;
  
  constructor(private activatedRoute: ActivatedRoute) {}
  isbn: number = 0;
  ngOnInit(): void {
    this.isbn = this.activatedRoute.snapshot.params['isbn'];
  }




}
