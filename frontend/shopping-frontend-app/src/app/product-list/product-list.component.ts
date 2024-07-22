import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null; // Holds the selected product for the modal
  quantity: number = 1; // Holds the quantity for the selected product
  modalRef!: BsModalRef; // Non-null assertion operator used here

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }

  openModal(template: TemplateRef<any>, product: Product): void { // Shows the modal and sets the selected product
    this.selectedProduct = product;
    this.quantity = 1;  // Reset quantity to 1 for each new product selection
    this.modalRef = this.modalService.show(template);
  }

  getTotalPrice(): number {
    if (this.selectedProduct) {
      return this.selectedProduct.price * this.quantity;
    }
    return 0;
  }

  addToCart(): void { // Adds the selected product with the specified quantity to the cart
    if (this.selectedProduct) {
      const cartItem: CartItem = {
        productId: this.selectedProduct.id,
        name: this.selectedProduct.name,
        price: this.selectedProduct.price,
        quantity: this.quantity
      };
      this.cartService.addItem(cartItem);
      this.modalRef.hide();  // Hide the modal
    }
  }
}
