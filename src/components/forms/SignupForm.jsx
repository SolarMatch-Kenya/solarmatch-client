// Registration form for new users

// src/pages/auth/Signup.jsx
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // You can reuse login after successful signup
  const [error, setError] = useState("");

  // Validation schema
  const SignupSchema = Yup.object({
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
      const response = await fetch("https://api.solarmatch.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) throw new Error("Signup failed");

      const data = await response.json();
      // Assuming backend returns { user, token }
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Automatically log in and redirect
      login(values.email, values.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left Side - Signup Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center px-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Create Your Account</h1>
          <p className="text-sm text-yellow-600 mb-6">Start your solar journey today.</p>

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700">Email</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Password</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="w-full px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-full hover:bg-yellow-500 transition"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-between">
            <button className="flex items-center justify-center w-[48%] py-2 border rounded-full font-semibold hover:bg-gray-50">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>

            <button className="flex items-center justify-center w-[48%] py-2 border rounded-full font-semibold hover:bg-gray-50">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Sign up with Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-yellow-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Info Section */}
      <div className="w-1/2 bg-gray-300 flex flex-col justify-center px-16 text-white">
        <div>
          <h2 className="text-3xl font-bold mb-4">Unlock Your Solar Potential</h2>
          <p className="text-lg mb-6 text-gray-100">
            Join SolarMatch Kenya to get personalized insights for your home, farm, or
            business. Make a smart, sustainable choice for a brighter future.
          </p>

          <div className="space-y-6 text-gray-100">
            <div>
              <p className="font-semibold text-white">⚡ AI-Powered Analysis</p>
              <p>Get accurate predictions on cost, savings, and ROI with our smart technology.</p>
            </div>
            <div>
              <p className="font-semibold text-white">💰 Save Money</p>
              <p>Discover how much you can save on energy bills and increase your property value.</p>
            </div>
            <div>
              <p className="font-semibold text-white">🌿 Go Green</p>
              <p>Calculate your CO₂ reduction and contribute to a cleaner Kenya.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
