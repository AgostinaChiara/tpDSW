import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-featured-book',
  templateUrl: './featured-book.component.html',
  styleUrls: ['./featured-book.component.css']
})
export class FeaturedBookComponent implements OnInit {
  @Input() book:any;
    
    constructor(private activatedRoute: ActivatedRoute) {}
    isbn: number = 0;
    ngOnInit(): void {
      this.isbn = this.activatedRoute.snapshot.params['isbn'];
    }
}