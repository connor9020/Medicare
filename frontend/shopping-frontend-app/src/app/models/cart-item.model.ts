// src/app/models/cart-item.model.ts
export class CartItem {
    constructor(
      public productId: number = 0,
      public name: string = "",
      public quantity: number = 0,
      public price: number = 0
    ) {}
  }
  