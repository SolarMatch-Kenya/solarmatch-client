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

      // check for saved pending analysis
      const pending = localStorage.getItem("pendingAnalysis");
      if (pending) {
        const analysis = JSON.parse(pending);
        localStorage.removeItem("pendingAnalysis");
        // optionally send to API via your AnalysisContext
        console.log("Submitting pending analysis:", analysis);
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Try again or register below.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Link to='/'>
        <div className="absolute top-6 left-6 flex items-center gap-2 text-gray-800 hover:text-[#f79436] transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
          </svg>
          <p>Back to homepage</p>
        </div>
      </Link>
      <div className="max-w-md bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-6">
          Sign in to continue to your SolarMatch dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#f79436] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#f79436] focus:border-transparent"
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
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#f79436] text-white py-3 rounded-md hover:bg-[#e68529] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
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
