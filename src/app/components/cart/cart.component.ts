import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Items } from '../../services/cart.service';
import { Router } from '@angular/router';
import { DecimalPipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Items[] = [];
  totalAmount: number = 0;
  fullName: string = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.calculateTotalAmount();
  }
  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalAmount();
  }

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  updateQuantity(productId: number, valueNew: any): void {
    const value = valueNew.target.value;
    this.cartService.updateQuantity(productId, value);
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  submitPayment(): void {
    var fullNameInput = <HTMLInputElement>document.getElementById('name');
    var addressInput = <HTMLInputElement>document.getElementById('address');
    var creditCardInput = <HTMLInputElement>(
      document.getElementById('creditCard')
    );
    var fullName = fullNameInput.value;
    var address = addressInput.value;
    var creditCard = creditCardInput.value;

    if (this.totalAmount === 0 || this.isQuantityMissing()) {
      this.showMsg('Please select product to pay');
    } else if (!fullName || !address || !creditCard) {
      this.showMsg('Please fill in all required fields');
    } else if (!this.isValidCreditCardNumber(creditCard)) {
      this.showMsg('Please enter a valid 16-digit credit card number');
    } else {
      this.cartService.clearCart();
      this.router.navigate(['/confirmation']);
    }
  }

  showMsg(message: string) {
    alert(message);
  }

  onFullNameChange(event: any) {
    this.fullName = event.target.value;
  }

  isValidCreditCardNumber(creditCard: string) {
    var regex = /^\d{16}$/;
    return regex.test(creditCard);
  }

  isQuantityMissing(): boolean {
    for (const product of this.cartService.getCartItems()) {
      if (!product.quantity) {
        return true;
      }
    }
    return false;
  }
}
