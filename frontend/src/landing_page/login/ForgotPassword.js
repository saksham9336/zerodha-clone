import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async () => {
    setError("");
    setSuccess("");

    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post((process.env.REACT_APP_API_URL + "/auth/reset-password"), {
        email,
        newPassword,
      });

      if (res.data.success) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") resetPassword();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>Z</div>
          <span style={styles.logoText}>Vista</span>
        </div>

        <h2 style={styles.heading}>Reset your password</h2>
        <p style={styles.subText}>Enter your registered email and a new password</p>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm New Password</label>
          <input
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <button onClick={resetPassword} style={styles.button} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p style={styles.footerText}>
          Remember your password? <a href="/login" style={styles.link}>Login here</a>
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
    marginBottom: "20px",
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
    marginBottom: "6px",
  },
  subText: {
    fontSize: "13px",
    color: "#777",
    marginBottom: "20px",
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
  success: {
    color: "#2ecc71",
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
  footerText: {
    marginTop: "25px",
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

export default ForgotPassword;
