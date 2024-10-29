import { Component } from '@angular/core';
import { CartService } from '../../services/CartService/cart.service';
import { Product } from '../../models/Product.model';
import { ReceiptService } from '../../services/ReceiptService/receipt.service';
import { Router } from '@angular/router'; // Importa Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  products: Product[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private receiptService: ReceiptService,
    private router: Router // Inyecta Router
  ) {
    this.products = cartService.getItems();
    this.total = cartService.getTotal();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.products = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  checkout() {
    this.cartService.clearCart();
    this.router.navigate(['/pago']); // Redirige a la ruta de pago
  }
}
