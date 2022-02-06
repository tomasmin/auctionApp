import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: { filter: 'myauctions', title: 'My Auctions' },
  },
  {
    path: 'auctions/my',
    component: ProductsComponent,
    data: { filter: 'myauctions', title: 'My Auctions' },
  },
  {
    path: 'auctions/active',
    component: ProductsComponent,
    data: { filter: 'active', title: 'Active Auctions' },
  },
  {
    path: 'auctions/mybids',
    component: ProductsComponent,
    data: { filter: 'mybids', title: 'Auctions I Have Bid In' },
  },
  { path: 'products/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
