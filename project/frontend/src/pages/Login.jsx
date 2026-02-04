import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("demoUser", JSON.stringify({ email }));
    navigate("/");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="note">Demo only. No real authentication.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-foot">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
