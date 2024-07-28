package com.medicare.entity;

public class StockUpdateRequest {
    private Long productId;
    private Long cid;
    private int quantity;
    private double totalPrice;

    // Getters and Setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getCid() {
        return cid;
    }

    public void setCid(Long Cid) {
        this.cid = Cid;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
