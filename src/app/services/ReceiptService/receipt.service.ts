import { Injectable } from '@angular/core';
import { Product } from '../../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  generateReceipt(items: Product[], total: number) {
    let receiptContent = `<?xml version="1.0" encoding="UTF-8" ?> \n`;
    receiptContent +=
      '<recibo>\n  <idCliente>1</idCliente>\n  <nombreCliente>admin</nombreCliente>\n  <pedido>';
    items.forEach((item) => {
      receiptContent += `   <producto>\n      <idProducto>${item.id}</idProducto>\n     <nombreProducto>${item.nombre}</nombreProducto>\n     <precio>${item.precio}</precio>\n   </producto>\n`;
    });
    receiptContent += ' </pedido>\n';
    receiptContent += ` <total>${total *1.16}</total>\n`;
    receiptContent += '</recibo>';
    this.downloadFile(receiptContent, 'receipt.xml');
  }

  private downloadFile(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
