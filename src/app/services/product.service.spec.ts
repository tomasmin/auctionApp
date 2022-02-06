import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let product: Product = new Product('test', 'test', 'Bill');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getPrice should return max bid value', () => {
    product.bids = [
      {
        username: 'Bill',
        timestamp: 12334567778,
        amount: 5,
      },
      {
        username: 'Elon',
        timestamp: 12334567779,
        amount: 10,
      },
      {
        username: 'Jeffrey',
        timestamp: 12334567789,
        amount: 100,
      },
    ];
    expect(service.getPrice(product)).toBe(100);
  });
});
