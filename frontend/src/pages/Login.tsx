import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // 🔐 STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // STORE USER OBJECT
        localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
        );

      // 👤 STORE ROLE (safe check added)
      localStorage.setItem("role", res.data.user?.role || "user");

      // 🚀 REDIRECT BASED ON ROLE (optional but useful)
      if (res.data.user?.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error: any) {
      alert(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="auth-page">

    {/* LEFT SIDE */}
    <div className="auth-left">

      <div className="auth-overlay">

        <h1 className="auth-brand">
          Smart CRM
        </h1>

        <p className="auth-description">
          Manage leads, analytics and customer
          relationships with a modern CRM system.
        </p>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="auth-right">

      <form
        onSubmit={handleLogin}
        className="auth-form"
      >

        <h2 className="auth-title">
          Welcome Back
        </h2>

        <p className="auth-subtitle">
          Login to continue
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="auth-input"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="auth-input"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="auth-btn"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* REGISTER */}
        <p className="auth-footer">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="auth-link"
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  </div>
);
};

export default Login;