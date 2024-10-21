import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/CartService/cart.service';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/ProductService/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'], // Asegúrate que el nombre es 'styleUrls', no 'styleUrl'
})
export class CatalogListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Obtener productos desde la API y suscribirse al observable
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error al cargar los productos', err);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log(this.cartService.getItems());
  }
}

