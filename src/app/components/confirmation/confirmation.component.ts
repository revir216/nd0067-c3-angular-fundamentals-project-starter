import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit  {
  protected fullName: string;
  protected totalAmount: number;
  constructor(private router: Router,private cartService: CartService) {
    this.fullName = localStorage.getItem('fullName') || ""  ;
    this.totalAmount = localStorage.getItem('totalAmount')? parseFloat(localStorage.getItem('totalAmount')|| "0") : 0;
  }

  closeDialog(){
    alert('Order confirmed');
    this.router.navigate(['/']);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  ngOnInit(): void {

  }
}
