import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post((process.env.REACT_APP_API_URL + "/auth/login"), {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", res.data.email);
        window.location.href = `${process.env.REACT_APP_DASHBOARD_URL}?token=${res.data.token}&email=${encodeURIComponent(res.data.email)}`;
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>Z</div>
        <span style={styles.logoText}>Vista</span>
        </div>

        <h2 style={styles.heading}>Login</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={login} style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.forgotText}>
          <a href="/forgot-password" style={styles.link}>Forgot password?</a>
        </p>

        <p style={styles.footerText}>
           New to Vista? <a href="/signup" style={styles.link}>Create an account</a>
        </p>
      </div>

      <p style={styles.bottomText}>
         © 2026 TradeVista — Built for learning purposes
      </p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff",
    width: "90%",
    maxWidth: "380px",
    padding: "40px 35px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  logoMark: {
    width: "36px",
    height: "36px",
    background: "#6C5CE7",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "18px",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "400",
    color: "#333",
    marginBottom: "25px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#777",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    borderBottom: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
    background: "transparent",
  },
  error: {
    color: "#e74c3c",
    fontSize: "13px",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#6C5CE7",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px",
  },
  forgotText: {
    marginTop: "15px",
    fontSize: "13px",
    textAlign: "center",
  },
  footerText: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#777",
    textAlign: "center",
  },
  link: {
    color: "#6C5CE7",
    textDecoration: "none",
    fontWeight: "500",
  },
  bottomText: {
    marginTop: "30px",
    fontSize: "12px",
    color: "#aaa",
  },
};

export default Login;
