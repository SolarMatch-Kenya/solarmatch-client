// Login form (email/password)

// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ user_name: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.user_name, form.password);

      // Redirect to Verify page
      navigate("/verify");
    } catch (err) {
      setError(err.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Link to='/'>
        <div className="absolute top-6 left-6 flex items-center gap-2 text-gray-800 hover:text-[#f79436] transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
          <p>Back to homepage</p>
        </div>
      </Link>
      <div className="m-auto w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-6">
          Sign in to continue to your SolarMatch dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
  <Link
    to="/forgot-password"
    className="text-sm text-[#f79436] hover:underline"
  >
    Forgot Password?
  </Link>
</div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#f79436] text-white py-2 rounded hover:bg-[#e68529]"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to={`/register?redirect=${location.search.replace("?redirect=", "") || "/dashboard"}`}
            className="text-[#f79436] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
