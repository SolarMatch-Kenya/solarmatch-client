// Registration form for new users

// src/pages/auth/Signup.jsx
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // You can reuse login after successful signup
  const [error, setError] = useState("");

  // Validation schema
  const SignupSchema = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }

      const data = await response.json();
      // Backend returns { message, user }
      localStorage.setItem("user", JSON.stringify(data.user));

      // Automatically log in and redirect
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
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
        <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
        <p className="text-gray-600 mb-6">Start your solar journey today.</p>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#f79436] focus:border-transparent"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#f79436] focus:border-transparent"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#f79436] focus:border-transparent"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#f79436] focus:border-transparent"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#f79436] text-white py-3 rounded-md hover:bg-[#e68529] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#f79436] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}