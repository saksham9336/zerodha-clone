import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:3002/auth/signup", {
        email,
        password,
      });

      if (res.data.success) {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Create Zerodha Account</h2>

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
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button
          onClick={signup}
          style={{ padding: "10px 30px", backgroundColor: "#387ed1", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "300px" }}
        >
          Create Account
        </button>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
}

export default Signup;