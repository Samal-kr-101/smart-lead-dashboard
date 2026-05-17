import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
    const navigate = useNavigate();
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

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
        toast.success("Registered successfully!");
        navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error registering user");
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
          Create your account and start managing
          leads, analytics and customer data
          professionally.
        </p>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="auth-right">

      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >

        <h2 className="auth-title">
          Create Account
        </h2>

        <p className="auth-subtitle">
          Register to continue
        </p>

        {/* NAME */}
        <input
          name="name"
          type="text"
          placeholder="Enter Name"
          className="auth-input"
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          className="auth-input"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          className="auth-input"
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="auth-btn"
        >
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="auth-footer">

          Already have an account?{" "}

          <a
            href="/login"
            className="auth-link"
          >
            Login
          </a>

        </p>

      </form>

    </div>

  </div>
);
};

export default Register;