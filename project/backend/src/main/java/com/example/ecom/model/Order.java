package com.example.ecom.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();

    private double total;

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public List<OrderItem> getItems() { return items; }
    public double getTotal() { return total; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setItems(List<OrderItem> items) { this.items = items; }
    public void setTotal(double total) { this.total = total; }
}
