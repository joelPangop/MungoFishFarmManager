import {Component, OnInit} from '@angular/core';
import {TankProductService} from "../../services/tank-product.service";
import {TankProduct} from "../../models/TankProduct";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tank-product',
  templateUrl: './tank-product.component.html',
  styleUrls: ['./tank-product.component.css']
})
export class TankProductComponent implements OnInit {

  product!: TankProduct;
  products!: TankProduct[];
  private checkedProducts: number[] = [];
  prodForm: FormGroup;
  prodFormSubmitted: boolean = false;

  constructor(public productService: TankProductService) {
    this.product = new TankProduct();
    this.products = [];
    this.prodForm = new FormGroup({
      type: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((res) => {
      this.productService.tankProducts = res;
    })
  }

  createProduct(prodForm: any) {
    this.prodFormSubmitted = true;
    if (this.prodForm.valid) {
      this.productService.tankProduct.type = this.prodForm.value.type;
      this.productService.tankProduct.qtyProduct = this.prodForm.value.quantity;
      if (!this.productService.tankProduct.id) {
        this.productService.create().subscribe((res) => {
          if (res.status === "Success") {
            this.productService.tankProducts.push(res.product);
            this.product = new TankProduct();
            this.prodFormSubmitted = false;
          }
        })
      } else {
        this.productService.update(this.productService.tankProduct.id).subscribe((res) => {
          if (res.status === "Success") {
            for (let i = 0; i < this.productService.tankProducts.length; i++) {
              if (this.productService.tankProducts[i].id === res.product.id) {
                this.productService.tankProducts[i] = res.product;
                this.product = new TankProduct();
                this.prodFormSubmitted = false;
              }
            }
          }
        })
      }
    }
  }

  deleteProduct() {
    let deleted = [];
    for (let i = this.checkedProducts.length - 1; i >= 0; i--) {
      deleted.push(this.productService.tankProducts[this.checkedProducts[i]].id);
    }
    for (let i = this.checkedProducts.length - 1; i >= 0; i--) {
      this.productService.delete(deleted).subscribe((res) => {
        if (res.status === "Success") {
          this.productService.tankProducts.splice(this.checkedProducts[0], this.checkedProducts.length);
        }
      })
    }
  }

  onCheckProduct(event: any) {
    if (event.target.checked) {
      this.checkedProducts.push(event.target.value);
    } else {
      let i: number = 0;
      this.checkedProducts.forEach((item) => {
        if (item == event.target.value) {
          this.checkedProducts.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log(this.checkedProducts);
  }

  editProduct(product: TankProduct) {
    this.product = product;
  }
}
