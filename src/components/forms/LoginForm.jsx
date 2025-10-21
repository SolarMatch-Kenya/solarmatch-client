// Login form (email/password)

// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);

      // check redirect param or default
      const redirectPath = new URLSearchParams(location.search).get("redirect") || "/dashboard";

      // check for saved pending analysis
      const pending = localStorage.getItem("pendingAnalysis");
      if (pending) {
        const analysis = JSON.parse(pending);
        localStorage.removeItem("pendingAnalysis");
        // optionally send to API via your AnalysisContext
        console.log("Submitting pending analysis:", analysis);
      }

      navigate(redirectPath);
    } catch (err) {
      setError("Invalid credentials. Try again or register below.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-6">
          Sign in to continue to your SolarMatch dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
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
