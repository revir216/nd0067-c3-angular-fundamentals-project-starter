import { Component,OnInit,Input } from '@angular/core';
import { Product } from "../../models/product.model";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product;
  selectedQuantities: { [productId: number]: number } = {};

  constructor(private router: Router,private productService: ProductService,private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      url: ''
    }
  }

  getProductDetail(productId: number): void {
    this.router.navigate([ '/product', productId ]);
  }

  updateSelectedQuantity(product: Product, quantity: number): void {
    this.selectedQuantities[product.id] = quantity;
  }

  addToCart(product: Product): void {
    const selectedQuantity = this.selectedQuantities[product.id];
    this.cartService.addToCart(product, selectedQuantity);
  }

  ngOnInit(): void {
  }
}
