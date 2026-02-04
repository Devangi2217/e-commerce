package com.example.ecom.controller;

import com.example.ecom.model.*;
import com.example.ecom.repo.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = { "http://localhost:5173", "http://dm_shoppingmart.com:5173" })
public class OrderController {
    private final OrderRepo orderRepo;
    private final CartRepo cartRepo;
    private final ProductRepo productRepo;

    public OrderController(OrderRepo orderRepo, CartRepo cartRepo, ProductRepo productRepo) {
        this.orderRepo = orderRepo;
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    @PostMapping("/{userId}/checkout")
    public Order checkout(@PathVariable Long userId) {
        List<CartItem> items = cartRepo.findByUserId(userId);
        Order order = new Order();
        order.setUserId(userId);

        double total = 0;
        for (CartItem c : items) {
            Product p = productRepo.findById(c.getProductId()).orElseThrow();
            OrderItem oi = new OrderItem();
            oi.setProductId(p.getId());
            oi.setProductName(p.getName());
            oi.setPrice(p.getPrice());
            oi.setQuantity(c.getQuantity());
            total += oi.getPrice() * oi.getQuantity();
            order.getItems().add(oi);
        }

        order.setTotal(total);
        cartRepo.deleteByUserId(userId);
        return orderRepo.save(order);
    }
}
