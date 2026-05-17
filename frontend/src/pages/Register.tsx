import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

    const [password, setPassword] = useState("");

    <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

    try {
      // ✅ USE CENTRAL API INSTANCE (NO LOCALHOST)
      await API.post("/auth/register", form);

      toast.success("Registered successfully!");
      navigate("/login");

    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error registering user"
      );
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="auth-overlay">
          <h1 className="auth-brand">Smart CRM</h1>

          <p className="auth-description">
            Create your account and start managing leads, analytics and customer data professionally.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">

          <h2 className="auth-title">Create Account</h2>

          <p className="auth-subtitle">Register to continue</p>

          {/* NAME */}
          <input
            name="name"
            type="text"
            placeholder="Enter Name"
            className="auth-input"
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="auth-input"
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="auth-input"
            onChange={handleChange}
            required
          />

          {/* BUTTON */}
          <button type="submit" className="auth-btn">
            Register
          </button>

          {/* LOGIN LINK */}
          <p className="auth-footer">
            Already have an account?{" "}
            <a href="/login" className="auth-link">
              Login
            </a>
          </p>

        </form>
      </div>

    </div>
  );
};

export default Register;