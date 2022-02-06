import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Status } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { TimeService } from '../../services/time.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  isOwnedByCurrentUser: boolean = false;
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private titleService: Title,
    private timeService: TimeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProduct(params['id']).subscribe((product) => {
        this.product = product;
        this.titleService.setTitle(product.name);
        if (this.userService.getCurrentUsername() === product.username) {
          this.isOwnedByCurrentUser = true;
        }
        this.initTimer();
      });
    });
  }

  startAuction(product: Product) {
    let id = product._id;
    let currentTimestamp = Math.floor(new Date().getTime() / 1000);
    product.status = Status.active;
    product.startedTimestamp = currentTimestamp;
    product.endingTimestamp = currentTimestamp + environment.auctionExpTime;
    product.bids = [];
    product.isStarted = true;

    this.productService.updateAuction(id, product).subscribe();
  }

  initTimer() {
    setInterval(() => {
      if (
        this.product &&
        this.product.status === Status.active &&
        this.product.endingTimestamp
      ) {
        let timer = this.timeService.getTimerValue(
          this.product.endingTimestamp
        );
        this.product.timeLeft = timer.timeLeftFormatted;

        if (timer.timeLeft <= 0) {
          this.product.status = Status.closed;
          delete this.product.timeLeft;
          this.productService
            .updateAuction(this.product._id, this.product)
            .subscribe();
        }
      }
      this.isLoaded = true;
    }, 1000);
  }
}
