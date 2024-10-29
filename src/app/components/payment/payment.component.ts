import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StripeService } from '../../services/stripe.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true, // Marcar como standalone
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [
    // Importa aquí los módulos necesarios, como CommonModule u otros
  ]
})
export class PaymentComponent implements OnInit{
  constructor(private stripeService: StripeService, private http: HttpClient) { }

  ngOnInit(): void {
    this.setupStripe();
  }

  async setupStripe() {
    const stripe = this.stripeService.getStripe();
    if (!stripe) {
      console.error('Stripe no se ha inicializado');
      return;
    }

    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');

    // Verificación para asegurarnos de que el formulario existe
    const form = document.getElementById('payment-form');
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const { token, error } = await stripe.createToken(card);
        if (error) {
          console.error('Error al crear el token', error);
        } else {
          console.log('Token creado:', token);
          this.http.post('http://localhost:3000/charge', { token })
            .subscribe(
              response => console.log('Pago realizado:', response),
              error => console.error('Error al procesar el pago:', error)
            );
        }
      });
    } else {
      console.error('Formulario de pago no encontrado');
    }
  }
}
