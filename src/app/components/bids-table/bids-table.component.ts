import { Component, Input, OnInit } from '@angular/core';
import { Product, Bid } from '../../models/product.model';

@Component({
  selector: 'app-bids-table',
  templateUrl: './bids-table.component.html',
  styleUrls: ['./bids-table.component.scss'],
})
export class BidsTableComponent implements OnInit {
  @Input() bids: Bid[] = [];
  displayedColumns: string[] = ['amount', 'username', 'timestamp'];
  constructor() {}

  ngOnInit(): void {
    this.sortBids();
  }

  sortBids() {
    this.bids = this.bids.sort((a, b) => b.amount - a.amount);
  }
}
