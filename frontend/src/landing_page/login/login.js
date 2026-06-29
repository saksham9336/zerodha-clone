import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    setError("");
    try {
      const res = await axios.post("http://localhost:3002/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", res.data.email);
        window.location.href = "http://localhost:3001";
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login to Zerodha</h2>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "280px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "280px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          onClick={login}
          style={{ padding: "10px 30px", backgroundColor: "#387ed1", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "300px" }}
        >
          Login
        </button>
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div>
    </div>
  );
}

export default Login;