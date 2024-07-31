package com.eshopping.entity;

public class UpdateBalanceRequest {
	
    private Long cid;
    private double balance;
    
    
	public Long getCid() {
		return cid;
	}
	public void setCid(Long cid) {
		this.cid = cid;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}

    
    
}