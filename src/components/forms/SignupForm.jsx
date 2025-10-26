import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Bulb from '../ui/Bulb'

export default function SignupForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState("");

  // Validation schema
  const SignupSchema = Yup.object({
    full_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "At least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
    phone_number: Yup.string().nullable(),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      await register(values.full_name, values.email, values.password, values.phone_number);
      alert("Signup successful! You are now logged in.");
      navigate("/dashboard");
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
          <Link to='/'>
            <div className="pb-4 flex items-center gap-2 text-gray-800 hover:text-[#f79436] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
              <p>Back to homepage</p>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Create Your Account</h1>
          <p className="text-sm text-yellow-600 mb-6">Start your solar journey today.</p>

          <Formik
            initialValues={{ full_name: "", email: "", password: "", confirmPassword: "", phone_number: "" }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700">Full Name</label>
                  <Field
                    name="full_name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border rounded-[10px] outline-none focus:ring-2 focus:ring-[#f79436]"
                  />
                  <ErrorMessage
                    name="full_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Email</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-[10px] outline-none focus:ring-2 focus:ring-[#f79436]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Phone Number</label>
                  <Field
                    name="phone_number"
                    type="text"
                    placeholder="Enter your phone number (optional)"
                    className="w-full px-4 py-2 border rounded-[10px] outline-none focus:ring-2 focus:ring-[#f79436]"
                  />
                  <ErrorMessage
                    name="phone_number"
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
                    className="w-full px-4 py-2 border rounded-[10px] outline-none focus:ring-2 focus:ring-[#f79436]"
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
                    className="w-full px-4 py-2 border rounded-[10px] outline-none focus:ring-2 focus:ring-[#f79436]"
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
                  className="w-full py-3 border bg-[#f79436] text-white font-semibold rounded-[10px] hover:bg-[#f79436] hover:text-white transition"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex items-center my-4">
            <hr className="grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="grow border-gray-300" />
          </div>

          <div className="flex justify-between">
            <button className="flex items-center justify-center w-[48%] py-2 border rounded-[10px] font-semibold hover:bg-gray-50">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>

            <button className="flex items-center justify-center w-[48%] py-2 border rounded-[10px] font-semibold hover:bg-gray-50">
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
      <div className="w-1/2 bg-[#fff7f2] flex flex-col justify-center px-16 text-black">
        <div>
          <h2 className="text-3xl font-bold mb-4">Redefine Energy. Redefine You.</h2>
          <p className="text-lg mb-6 text-black">
            Join SolarMatch Kenya to get personalized insights for your home, farm, or
            business. Make a smart, sustainable choice for a brighter future.
          </p>

          <div className="space-y-6 text-black">
  <div className="flex gap-3">
    <div className="shrink-0 flex items-stretch">
      <div className="flex items-center">
        <Bulb className="text-yellow-500 h-full w-6" />
      </div>
    </div>
    <div>
      <p className="font-semibold text-black">AI-Powered Analysis</p>
      <p>Get accurate predictions on cost, savings, and ROI with our smart technology.</p>
    </div>
  </div>

  <div className="flex gap-3">
    <div className="shrink-0 flex items-stretch">
      <div className="flex items-center">
        <Bulb className="text-yellow-500 h-full w-6" />
      </div>
    </div>
    <div>
      <p className="font-semibold text-black">Save Money</p>
      <p>Discover how much you can save on energy bills and increase your property value.</p>
    </div>
  </div>

  <div className="flex gap-3">
    <div className="shrink-0 flex items-stretch">
      <div className="flex items-center">
        <Bulb className="text-yellow-500 h-full w-6" />
      </div>
    </div>
    <div>
      <p className="font-semibold text-black">Go Green</p>
      <p>Calculate your CO₂ reduction and contribute to a cleaner Kenya.</p>
    </div>
  </div>
</div>


        </div>
      </div>
    </div>
  );
}