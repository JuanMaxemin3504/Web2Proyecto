import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
@Injectable({
providedIn: 'root'
})
export class StripeService {
private stripe: Stripe | null = null;
private readonly stripePublicKey = 'TU_CLAVE_PUBLICA';
constructor() {
this.initializeStripe();
}
private async initializeStripe() {
this.stripe = await loadStripe(this.stripePublicKey);
}
getStripe() {
return this.stripe;
}
}
