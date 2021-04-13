import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class AngAppProductsService {


  private baseUri = "http://localhost:3000/products";
  private headers = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) { }

  getProducts(){
    return this.http.get<any>(this.baseUri);
  }
  addProduct(product: Product) {
    return this.http.post<any>(this.baseUri + "/" + "add", product, { headers: this.headers });
  }

  updateProduct(product: Product) {
    return this.http.put<any>(this.baseUri + "/" + product._id, product,{ headers: this.headers });
  }

  deleteProduct(product: Product) {
    return this.http.delete<any>(this.baseUri + "/" + product._id);
  }

}
