import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API = "https://e-commerce-1-olbu.onrender.com/api";

const IMAGE_MAP = {
  1: "/images/White-T-shirt.jpg",
  2: "/images/flat-minimalist-tshirt.avif",
  3: "/images/FreeVe-tshirt.jpg",
  4: "/images/sneaker.webp",
  5: "/images/high-sneaker.avif",
  6: "/images/jordan-sneaker.jpg",
  7: "/images/bagpack.avif",
  8: "/images/black-school-bag.jpeg",
  9: "/images/round-glass.jpg",
  10: "/images/sun_glass.jpeg",
};

const CATEGORY_MAP = {
  1: "Clothing",
  2: "Clothing",
  3: "Clothing",
  4: "Footwear",
  5: "Footwear",
  6: "Footwear",
  7: "Bags",
  8: "Bags",
  9: "Accessories",
  10: "Accessories",
};

export default function Home() {
  const userId = 1;
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    address: "",
    card: "",
    exp: "",
    cvc: "",
  });

  useEffect(() => {
    fetch(`${API}/products`).then(r => r.json()).then(setProducts);
    fetch(`${API}/cart/${userId}`).then(r => r.json()).then(setCart);
  }, []);

  function refreshCart() {
    return fetch(`${API}/cart/${userId}`).then(r => r.json()).then(setCart);
  }

  function addToCart(id) {
    return fetch(`${API}/cart/${userId}/add/${id}`, { method: "POST" })
      .then(refreshCart);
  }

  function changeQuantity(id, delta) {
    const current = cart.find(item => item.productId === id);
    const nextQty = (current?.quantity || 0) + delta;
    return fetch(`${API}/cart/${userId}/set/${id}?quantity=${nextQty}`, {
      method: "POST",
    }).then(refreshCart);
  }

  function removeItem(id) {
    return fetch(`${API}/cart/${userId}/remove/${id}`, { method: "DELETE" })
      .then(refreshCart);
  }

  function checkout() {
    if (cart.length === 0) return;
    return fetch(`${API}/orders/${userId}/checkout`, { method: "POST" })
      .then(r => r.json())
      .then(() => refreshCart());
  }

  const productMap = useMemo(() => {
    return Object.fromEntries(products.map(p => [p.id, p]));
  }, [products]);

  const categories = useMemo(() => {
    const list = products.map(p => CATEGORY_MAP[p.id] || "Other");
    return ["All", ...Array.from(new Set(list))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const category = CATEGORY_MAP[p.id] || "Other";
      const matchesCategory = activeCategory === "All" || category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  const cartItems = useMemo(() => {
    return cart
      .map(item => ({
        ...item,
        product: productMap[item.productId],
      }))
      .filter(item => item.product);
  }, [cart, productMap]);

  const { total, count } = useMemo(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { total: totalPrice, count: totalCount };
  }, [cartItems]);

  function productImage(product) {
    return IMAGE_MAP[product.id] || "/images/placeholder.svg";
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({ ...prev, [name]: value }));
  }

  function submitPayment(e) {
    e.preventDefault();
    if (cart.length === 0) return;
    setPaymentStatus("Payment approved (demo).");
    checkout();
  }

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <span className="logo">ShopMart</span>
          <span className="subtext">Delivering smart deals</span>
        </div>
        <div className="search">
          <input
            placeholder="Search products"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button">Search</button>
        </div>
        <div className="cart-summary">
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <span>|</span>
            <Link to="/register">Register</Link>
          </div>
          <span className="cart-count">Cart: {count}</span>
          <button onClick={() => setShowCheckout(true)} disabled={cart.length === 0}>
            Checkout
          </button>
        </div>
      </header>

      <nav className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={cat === activeCategory ? "category active" : "category"}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <section>
        <h2>Products</h2>
        <div className="grid">
          {filteredProducts.map(p => (
            <div className="card" key={p.id}>
              <button
                className="card-link"
                type="button"
                onClick={() => setSelectedProduct(p)}
              >
                <img className="product-img" src={productImage(p)} alt={p.name} />
              </button>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <span className="badge">{CATEGORY_MAP[p.id] || "Other"}</span>
              <strong>${p.price}</strong>
              <div style={{ marginTop: 10 }}>
                <button onClick={() => addToCart(p.id)}>Add to Cart</button>
                <button className="ghost-btn" onClick={() => setSelectedProduct(p)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cart">
        <h2>Cart</h2>
        {cart.length === 0 && <p>No items</p>}
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span className="cart-actions">
                <button
                  className="qty-btn"
                  onClick={() => changeQuantity(item.productId, -1)}
                >
                  -
                </button>
                <button
                  className="qty-btn"
                  onClick={() => changeQuantity(item.productId, 1)}
                >
                  +
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
        <div className="total">Total: ${total}</div>
      </section>

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <img
              className="modal-img"
              src={productImage(selectedProduct)}
              alt={selectedProduct.name}
            />
            <div className="modal-content">
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <strong>${selectedProduct.price}</strong>
              <div className="modal-actions">
                <button onClick={() => addToCart(selectedProduct.id)}>
                  Add to Basket
                </button>
                <button
                  className="ghost-btn"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="modal-backdrop" onClick={() => setShowCheckout(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <h2>Checkout</h2>
              <p className="note">Demo payment only. No real charge.</p>
              <form className="checkout-form" onSubmit={submitPayment}>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={checkoutForm.name}
                  onChange={handleFormChange}
                  required
                />
                <input
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={checkoutForm.email}
                  onChange={handleFormChange}
                  required
                />
                <input
                  name="address"
                  placeholder="Shipping Address"
                  value={checkoutForm.address}
                  onChange={handleFormChange}
                  required
                />
                <input
                  name="card"
                  placeholder="Card Number"
                  value={checkoutForm.card}
                  onChange={handleFormChange}
                  required
                />
                <div className="checkout-row">
                  <input
                    name="exp"
                    placeholder="MM/YY"
                    value={checkoutForm.exp}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    name="cvc"
                    placeholder="CVC"
                    value={checkoutForm.cvc}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit">Pay ${total}</button>
                  <button
                    className="ghost-btn"
                    type="button"
                    onClick={() => setShowCheckout(false)}
                  >
                    Close
                  </button>
                </div>
                {paymentStatus && <p className="success">{paymentStatus}</p>}
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div>
          <h4>Get to Know Us</h4>
          <p>About</p>
          <p>Careers</p>
          <p>Press</p>
        </div>
        <div>
          <h4>Customer Care</h4>
          <p>Help Center</p>
          <p>Returns</p>
          <p>Shipping</p>
        </div>
        <div>
          <h4>Connect</h4>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
      </footer>
    </div>
  );
}
