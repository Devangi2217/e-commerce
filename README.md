# E-Commerce Platform

A full-stack e-commerce demo that showcases product browsing, cart management, and checkout flow with a React frontend and a Spring Boot backend.

**Key Features**
- Product catalog with categories and search
- Add to cart, update quantity, and remove items
- Modal product details
- Demo checkout with validation and status message
- Seeded product data for quick testing

**Tech Stack**
- Frontend: React, React Router, Vite
- Backend: Spring Boot, Spring Data JPA
- Database: H2 (in-memory)

**Architecture**
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:8080`
- Frontend calls REST APIs at `http://localhost:8080/api`

**Project Structure**
- `project/frontend` React app
- `project/backend` Spring Boot API
- `project/images` product images and assets

**Getting Started**

Backend (Spring Boot)
1. Open `project/backend`.
2. Run:
```bash
mvn spring-boot:run
```
3. API starts at `http://localhost:8080`.

Frontend (React + Vite)
1. Open `project/frontend`.
2. Run:
```bash
npm install
npm run dev
```
3. App starts at `http://localhost:5173`.

**API Endpoints (Backend)**
- `GET /api/products` list products
- `POST /api/products` create product
- `GET /api/cart/{userId}` get cart items
- `POST /api/cart/{userId}/add/{productId}` add item
- `POST /api/cart/{userId}/set/{productId}?quantity=QTY` set quantity
- `DELETE /api/cart/{userId}/remove/{productId}` remove item
- `POST /api/orders/{userId}/checkout` create order and clear cart

**Notes**
- Payments are demo-only. No real transactions are processed.
- CORS is configured for `http://localhost:5173` in the backend controllers.

**Future Improvements**
- Authentication and user profiles
- Persistent database (PostgreSQL/MySQL)
- Order history and admin management
- Real payment gateway integration
