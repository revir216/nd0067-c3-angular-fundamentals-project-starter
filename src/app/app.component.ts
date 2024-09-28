import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { CartComponent } from "./components/cart/cart.component";
import { ProductItemComponent } from "./components/product-item/product-item.component";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductItemComponent,ProductListComponent,CartComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nd0067-c3-angular-fundamentals-project-starter';
}
