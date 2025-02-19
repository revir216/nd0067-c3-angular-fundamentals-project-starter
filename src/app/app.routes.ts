import { Routes } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductItemDetailComponent } from "./components/product-item-detail/product-item-detail.component";
import { CartComponent } from "./components/cart/cart.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductItemDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'confirmation', component: ConfirmationComponent },
];
