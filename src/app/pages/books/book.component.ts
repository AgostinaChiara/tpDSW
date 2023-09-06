import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent  {

  @Input() book:any;
  
  constructor(private storeService: StoreService) {}




}
