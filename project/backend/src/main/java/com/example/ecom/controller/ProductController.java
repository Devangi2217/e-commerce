package com.example.ecom.controller;

import com.example.ecom.model.Product;
import com.example.ecom.repo.ProductRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = { "http://localhost:5173", "http://dm_shoppingmart.com:5173", "https://e-commerce-xf1i.onrender.com" })
public class ProductController {
    private final ProductRepo repo;

    public ProductController(ProductRepo repo) { this.repo = repo; }

    @GetMapping
    public List<Product> all() { return repo.findAll(); }

    @PostMapping
    public Product create(@RequestBody Product p) { return repo.save(p); }
}
