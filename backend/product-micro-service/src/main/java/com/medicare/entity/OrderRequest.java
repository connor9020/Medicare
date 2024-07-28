package com.medicare.entity;

public class OrderRequest {
    private Long productId;
    private Long Cid;
    private int quantity;
    private double totalPrice;

    public OrderRequest(Long productId, Long Cid, int quantity, double totalPrice) {
        this.productId = productId;
        this.Cid = Cid;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getCid() {
        return Cid;
    }

    public void setCid(Long Cid) {
        this.Cid = Cid;
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
