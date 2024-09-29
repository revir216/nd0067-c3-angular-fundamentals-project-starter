import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForOf } from "@angular/common";
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Product } from "../../models/product.model";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [
    NgForOf,
    ProductItemComponent,
    FormsModule
  ],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css'
})
export class ProductItemDetailComponent implements OnInit {
  protected product: Product;
  selectedQuantities: { [productId: number]: number } = {};
  constructor(
        private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
      this.product = {
        id: 0,
        name: '',
        price: 0,
        url: '',
        description: ''
      }
  }

  updateSelectedQuantity(product: Product, quantity: number): void {
    this.selectedQuantities[product.id] = quantity;
  }

  addToCart(product: Product): void {
    const selectedQuantity = this.selectedQuantities[product.id];
    this.cartService.addToCart(product, selectedQuantity);
  }

  backToProducts(): void {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
    this.http.get<Array<Product>>('/assets/data.json').subscribe(res => {
      this.product =  res.find((product) =>
            product.id === parseInt(params.get('id') as string)) || this.product;
      });
    });
  }
}
