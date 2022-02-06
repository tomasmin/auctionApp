import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product, Bid } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-place-bid-form',
  templateUrl: './place-bid-form.component.html',
  styleUrls: ['./place-bid-form.component.scss'],
})
export class PlaceBidFormComponent implements OnInit {
  @Input() product: Product | undefined;
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  highestBid = 0;

  amountFormControl = new FormControl('', [
    Validators.min(0.01),
    Validators.max(999999999),
    Validators.required,
    Validators.pattern(this.numRegex),
  ]);
  placeBidForm: FormGroup = this.fb.group({
    amount: this.amountFormControl,
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.product?.highestBid) {
      this.highestBid = this.product.highestBid;
      this.amountFormControl.addValidators(
        Validators.min(this.highestBid + 0.01)
      );
    }
  }

  submit() {
    const amount = this.placeBidForm.value.amount;
    const username = this.userService.getCurrentUsername();
    let bid: Bid = {
      username: username,
      timestamp: Math.floor(new Date().getTime() / 1000),
      amount: amount,
    };
    if (this.product && this.product.endingTimestamp) {
      this.product.endingTimestamp += environment.auctionExtension;
      if (amount > this.product.highestBid) {
        this.product.highestBid = amount;
        this.product.bids.push(bid);
        this.productService
          .updateAuction(this.product._id, this.product)
          .subscribe(() => location.reload());
      } else {
        // TODO: error
      }
    }
  }
}
