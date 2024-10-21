import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class XMLService {
  constructor(private http: HttpClient) {}

  // Metodo para obtener los datos
  getProducts(): Observable<any> {
    return this.http
      .get('../assets/products/products.xml', { responseType: 'text' })
      .pipe(map((data) => this.parseXML(data)));
  }

  // Metodo para convertir el XML
  private parseXML(data: string) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const products = Array.from(xml.getElementsByTagName('product'));

    return products.map((product) => {
      return {
        id: product.getElementsByTagName('id')[0].textContent,
        nombre: product.getElementsByTagName('nombre')[0].textContent,
        descripcion: product.getElementsByTagName('descripcion')[0].textContent,
        precio: product.getElementsByTagName('precio')[0].textContent,
        imagenURL: product.getElementsByTagName('imagenURL')[0].textContent,
      };
    });
  }
}
