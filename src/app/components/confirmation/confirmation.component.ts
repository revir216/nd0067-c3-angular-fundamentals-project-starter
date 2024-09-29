import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  protected data: any;
  constructor(private router: Router) {
    this.data = {
      name: "",
      totalAmount: 0,
    };
  }

  closeDialog(){
    alert('Order confirmed');
    this.router.navigate(['/']);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
