import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Status } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  columns: number = 1;
  pageTitle: string = '';
  isLoaded: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private titleService: Title,
    private timeService: TimeService
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.columns = 1;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.columns = 1;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.columns = 2;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.columns = 3;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.columns = 4;
          }
        }
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.getProducts(data['filter']);
      this.pageTitle = data['title'];
      this.titleService.setTitle(data['title']);
    });
  }

  getProducts(filter: string): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      if (filter === 'active') {
        this.products = products.filter((p) => p.status == 'Active');
      } else if (filter === 'mybids') {
        this.products = products.filter(
          (p) =>
            p.bids.filter(
              (b) => b.username == this.userService.getCurrentUsername()
            ).length > 0
        );
      } else if (filter === 'myauctions') {
        this.products = products.filter(
          (p) => p.username == this.userService.getCurrentUsername()
        );
      } else {
        this.products = products;
      }
      this.initTimers();
    });
  }

  initTimers() {
    setInterval(() => {
      this.products.forEach((product, index) => {
        if (
          product.status === Status.active &&
          product.startedTimestamp &&
          product.endingTimestamp
        ) {
          let timer = this.timeService.getTimerValue(product.endingTimestamp);
          this.products[index].timeLeft = timer.timeLeftFormatted;

          if (timer.timeLeft <= 0) {
            this.products[index].status = Status.closed;
            delete this.products[index].timeLeft;
            this.productService
              .updateAuction(product._id, this.products[index])
              .subscribe();
          }
        }
      });
      this.isLoaded = true;
    }, 1000);
  }
}
