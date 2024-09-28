import { Component, OnInit } from "@angular/core";
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductItemDetailComponent } from "../product-item-detail/product-item-detail.component";
import { Product } from "../../models/product.model";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { NgForOf } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ ProductItemComponent, ProductItemDetailComponent, NgForOf, FormsModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedQuantities: { [productId: number]: number } = {};

  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {
    this.products.forEach((product) => {
      if (!this.selectedQuantities.hasOwnProperty(product.id)) {
        this.selectedQuantities[product.id] = 1;
      }
    });
  }

  getProductDetail(productId: number): void {
    this.router.navigate([ '/product', productId ]);
  }

  addToCart(product: Product): void {
    const selectedQuantity = this.selectedQuantities[product.id];
    // this.cartService.addToCart(product, selectedQuantity);
    // this._snackBar.open('Added data successfully', 'Close', {
    //   duration: 3000,
    //   verticalPosition: 'top',
    //   horizontalPosition: 'right',
    // });
  }


  updateSelectedQuantity(product: Product, quantity: number): void {
    this.selectedQuantities[product.id] = quantity;
  }


  ngOnInit() {
    this.http.get<Array<Product>>('/assets/data.json').subscribe(res => {
      this.products =  res;
    });
  }
}
