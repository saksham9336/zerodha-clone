import { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      const res = await axios.post("http://localhost:3002/auth/signup", {
        email: email,
        password: password
      });

      console.log(res.data);
      alert(res.data.msg);
    } catch (err) {
      console.error(err);
      alert("Signup error");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input 
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input 
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup}>Create Account</button>
    </div>
  );
}

export default Signup;
