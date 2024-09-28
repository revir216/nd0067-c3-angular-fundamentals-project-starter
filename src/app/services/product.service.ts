import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  private products: Array<Product> = [];

  constructor(private http: HttpClient) {
  }

  addToCartEvent = new EventEmitter<any>();

  getAllProducts(): Product[] {
    this.http.get<Array<Product>>('/assets/data.json').subscribe(result => {
      console.log(result);
    this.products = result
    });
    console.log(this.products);
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  ngOnInit() {
    this.http.get<Array<Product>>('/assets/data.json').subscribe(res => {
      this.products =  res;
    });
  }
}
