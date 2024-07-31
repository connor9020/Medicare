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
  selectedProduct: Product | null = null;
  quantity: number = 1;
  modalRef!: BsModalRef;
  quantityError: string | null = null; // Add this line

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

  openModal(template: TemplateRef<any>, product: Product): void {
    if (product.stock > 0) {
      this.selectedProduct = product;
      this.quantity = 1;
      this.quantityError = null; // Reset error message
      this.modalRef = this.modalService.show(template);
    } else {
      // Display a message or handle the case where stock is zero
      alert('This product is currently out of stock.');
    }
  }


  getTotalPrice(): number {
    if (this.selectedProduct) {
      return this.selectedProduct.price * this.quantity;
    }
    return 0;
  }

  addToCart(): void {
    if (this.selectedProduct) {
      const cartItem: CartItem = {
        productId: this.selectedProduct.id,
        name: this.selectedProduct.name,
        price: this.selectedProduct.price,
        quantity: this.quantity
      };
      this.cartService.addItem(cartItem);
      this.modalRef.hide();
    }
  }

  onTypeChange(event: Event): void {
    const selectedType = (event.target as HTMLSelectElement).value;
    if (selectedType === "All") {
      this.productService.getProducts().subscribe({
        next: (data: Product[]) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching products', error);
        }
      });
    } else {
      this.productService.getProductsByType(selectedType).subscribe({
        next: (data: Product[]) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching products by type', error);
        }
      });
    }
  }
}
