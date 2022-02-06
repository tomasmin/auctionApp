import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup = this.fb.group({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    public dialogRef: MatDialogRef<ProductFormComponent>
  ) {
    this.titleService.setTitle('Create Auction');
  }

  ngOnInit(): void {}

  submit() {
    let name = this.productForm.value.name;
    let description = this.productForm.value.description;
    let username = this.userService.getCurrentUsername();
    let product = new Product(name, description, username);
    this.productService.createAuction(product).subscribe((product) => {
      this.dialogRef.close();
      this.router.navigate(['products', product._id]);
    });
  }
}
