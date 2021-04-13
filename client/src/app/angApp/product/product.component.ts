import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { AngAppAuthService } from '../services/ang-app-auth.service';
import { AngAppProductsService } from '../services/ang-app-products.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product = new Product();
  products: Product[] = [];
  isUpdating = false;
  title = "";
  constructor(private angAppAuthService: AngAppAuthService,
    private angAppProduct: AngAppProductsService,
    private router: Router, public toast: ToastComponent) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.angAppProduct.getProducts().subscribe(
      res => {
        this.title = "Product Details";
        this.products = res.products;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['angApp/signin'])
          }
        }
      }
    )
  }

  enableUpdating(product: Product): void {
    this.isUpdating = true;
    this.title = "Product Update";
    this.product = product;
  }

  updateProduct(product: Product) {
    this.angAppProduct.updateProduct(product).subscribe(
      () => {
        this.isUpdating = false;
        this.product = product;
        this.toast.setMessage('Product updated successfully.', 'success');
      },
      err => console.log(err)
    )
  }

  cancelUpdating(): void {
    this.isUpdating = false;
    this.product = new Product();
    this.toast.setMessage('Product updating canceled.', 'warning');
    // reload the cats to reset the editing
    this.fetchProducts();
  }

  deleteProduct(product: Product) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.angAppProduct.deleteProduct(product).subscribe(
        () => {
          this.products = this.products.filter(elem => elem._id !== product._id);
          this.toast.setMessage('Product deleted successfully.', 'success');
        },
        err => console.log(err)
      );
    }
  }

}
