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
  currentNumber: number = 0;

  constructor(
    private http: HttpClient
  ) {
  }

  public handleDataChange($event:any):void {
    this.currentNumber = $event;
    // @ts-ignore
    document.getElementById('hidden').className='display';
  }

  ngOnInit() {
    this.http.get<Array<Product>>('/assets/data.json').subscribe(res => {
      this.products =  res;
    });
  }
}
