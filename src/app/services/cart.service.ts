import { Injectable } from '@angular/core';

export interface Items {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  Quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';
  cartItems: Items[] = [];

  constructor() {
    const storedCartItems = localStorage.getItem(this.storageKey);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  addToCart(product: any, quantity: number): void {
    const itemIndex: number = this.cartItems.findIndex(
      (cartItem) => cartItem.id === product.id
    );
    if (itemIndex !== -1) {
      console.log(typeof this.cartItems[itemIndex].Quantity, typeof product.quantity);
      this.cartItems[itemIndex].Quantity = this.cartItems[itemIndex].Quantity +=
        parseInt(quantity.toString(), 10);
    } else {
      let cartItem: Items = {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        Quantity: quantity,
      };
      this.cartItems.push(cartItem);
    }
    this.saveCartItems();
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCartItems();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  private saveCartItems(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  updateQuantity(productId: number, newQuantity: number): void {
    const itemIndex = this.cartItems.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].Quantity = newQuantity;
      this.saveCartItems();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem(this.storageKey);
  }
}
