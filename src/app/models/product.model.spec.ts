import { Product } from './product.model';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product('test name', 'test description', 'Bill')).toBeTruthy();
  });
});
