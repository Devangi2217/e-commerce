package com.example.ecom.controller;

import com.example.ecom.model.CartItem;
import com.example.ecom.model.Product;
import com.example.ecom.repo.CartRepo;
import com.example.ecom.repo.ProductRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = { "http://localhost:5173", "http://dm_shoppingmart.com:5173" })
public class CartController {
    private final CartRepo cartRepo;
    private final ProductRepo productRepo;

    public CartController(CartRepo cartRepo, ProductRepo productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    @GetMapping("/{userId}")
    public List<CartItem> items(@PathVariable Long userId) {
        return cartRepo.findByUserId(userId);
    }

    @PostMapping("/{userId}/add/{productId}")
    public CartItem add(@PathVariable Long userId, @PathVariable Long productId) {
        productRepo.findById(productId).orElseThrow();
        CartItem item = cartRepo.findByUserIdAndProductId(userId, productId)
            .orElseGet(() -> {
                CartItem created = new CartItem();
                created.setUserId(userId);
                created.setProductId(productId);
                created.setQuantity(0);
                return created;
            });
        item.setQuantity(item.getQuantity() + 1);
        return cartRepo.save(item);
    }

    @PostMapping("/{userId}/set/{productId}")
    public CartItem setQuantity(
        @PathVariable Long userId,
        @PathVariable Long productId,
        @RequestParam int quantity
    ) {
        if (quantity <= 0) {
            cartRepo.findByUserIdAndProductId(userId, productId)
                .ifPresent(cartRepo::delete);
            return null;
        }
        productRepo.findById(productId).orElseThrow();
        CartItem item = cartRepo.findByUserIdAndProductId(userId, productId)
            .orElseGet(() -> {
                CartItem created = new CartItem();
                created.setUserId(userId);
                created.setProductId(productId);
                return created;
            });
        item.setQuantity(quantity);
        return cartRepo.save(item);
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public void remove(@PathVariable Long userId, @PathVariable Long productId) {
        cartRepo.findByUserIdAndProductId(userId, productId)
            .ifPresent(cartRepo::delete);
    }
}
