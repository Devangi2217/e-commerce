package com.example.ecom;

import com.example.ecom.model.Product;
import com.example.ecom.repo.ProductRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EcomApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcomApplication.class, args);
    }

    @Bean
    CommandLineRunner seedProducts(ProductRepo repo) {
        return args -> {
            if (repo.count() > 0) return;
            Product p1 = new Product();
            p1.setName("White T-Shirt");
            p1.setDescription("Classic cotton tee");
            p1.setPrice(18);
            repo.save(p1);

            Product p2 = new Product();
            p2.setName("Minimalist Tee");
            p2.setDescription("Soft fit everyday");
            p2.setPrice(20);
            repo.save(p2);

            Product p3 = new Product();
            p3.setName("Graphic Tee");
            p3.setDescription("Bold print streetwear");
            p3.setPrice(22);
            repo.save(p3);

            Product p4 = new Product();
            p4.setName("Classic Sneakers");
            p4.setDescription("Cushioned daily runner");
            p4.setPrice(65);
            repo.save(p4);

            Product p5 = new Product();
            p5.setName("High-Top Sneaker");
            p5.setDescription("High ankle support");
            p5.setPrice(85);
            repo.save(p5);

            Product p6 = new Product();
            p6.setName("Retro Jordan");
            p6.setDescription("Iconic colorway");
            p6.setPrice(120);
            repo.save(p6);

            Product p7 = new Product();
            p7.setName("Campus Backpack");
            p7.setDescription("Roomy laptop storage");
            p7.setPrice(42);
            repo.save(p7);

            Product p8 = new Product();
            p8.setName("School Bag");
            p8.setDescription("Durable zip backpack");
            p8.setPrice(38);
            repo.save(p8);

            Product p9 = new Product();
            p9.setName("Round Glasses");
            p9.setDescription("Lightweight daily frame");
            p9.setPrice(25);
            repo.save(p9);

            Product p10 = new Product();
            p10.setName("Sun Glasses");
            p10.setDescription("UV protection lenses");
            p10.setPrice(30);
            repo.save(p10);
        };
    }
}
