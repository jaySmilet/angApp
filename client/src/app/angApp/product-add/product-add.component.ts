import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { AngAppProductsService } from '../services/ang-app-products.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  myReactiveForm: FormGroup;
  @Input() products: Product[] = [];
  constructor(private angAppProductService: AngAppProductsService, 
    private router: Router,public toast:ToastComponent) { }

  ngOnInit(): void {
    this.myReactiveForm = new FormGroup({
      'product_name': new FormControl(null, Validators.required),
      'product_price': new FormControl(null, Validators.required),
      'product_color': new FormControl(null, Validators.required),
      'product_quantity': new FormControl(null, Validators.required),
    })
  }

  submitAddProductForm() {
    // console.log(this.myReactiveForm.value)
    // this.products.push(this.myReactiveForm.value)
    this.angAppProductService.addProduct(this.myReactiveForm.value)
      .subscribe(
        (res) => {
          this.products.push(res);
          this.myReactiveForm.reset();
          this.toast.setMessage('product added successfully.', 'success');
        },
        (err) => console.log(err)
      );
  }

  resetForm(){  
    this.myReactiveForm.reset();
    this.toast.setMessage('All entries has been reset.', 'info');
  }

}
