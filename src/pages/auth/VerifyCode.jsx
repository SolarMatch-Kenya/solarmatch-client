// src/pages/auth/Verify.jsx
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Verify() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const VerifySchema = Yup.object({
    otp: Yup.string()
      .length(6, "Enter 6 digits")
      .required("OTP is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const response = await fetch("https://api.solarmatch.com/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: values.otp }),
      });

      if (!response.ok) throw new Error("Invalid or expired code");

      const data = await response.json();
      // Store auth token/user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Auto login and redirect to dashboard
      login(data.user.email, data.user.password); // Or just call setUser if you handle login differently
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const resendCode = async () => {
    try {
      setResending(true);
      const email = JSON.parse(localStorage.getItem("user"))?.email;
      if (!email) throw new Error("No email found");

      const res = await fetch("https://api.solarmatch.com/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to resend code");
      alert("Verification code resent!");
    } catch (err) {
      alert(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      <div className="w-1/2 bg-white flex flex-col justify-center items-center px-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Verify Your Account</h1>
          <p className="text-sm text-yellow-600 mb-6">
            Enter the 6-digit code sent to your email to complete registration.
          </p>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={VerifySchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="flex justify-between gap-2">
                  {[0, 1, 2, 3, 4, 5].map((_, index) => (
                    <Field
                      key={index}
                      name="otp"
                      maxLength="6"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className="w-12 h-12 text-center text-xl border rounded-[10px] outline-none focus:ring-2 focus:ring-[#f79436]"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                  ))}
                </div>
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 border bg-[#f79436] text-white font-semibold rounded-[10px] hover:bg-[#f79436]/90 transition"
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </button>

                <button
                  type="button"
                  onClick={resendCode}
                  disabled={resending}
                  className="w-full py-2 border border-[#f79436] text-[#f79436] font-semibold rounded-[10px] hover:bg-[#f79436]/10 transition"
                >
                  {resending ? "Resending..." : "Resend Code"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="w-1/2 bg-[#fff7f2] flex flex-col justify-center px-16 text-black">
        <div>
          <h2 className="text-3xl font-bold mb-4">Almost There!</h2>
          <p className="text-lg mb-6 text-black">
            Just one more step before you start your solar journey. Verify your email to activate your account.
          </p>
        </div>
      </div>
    </div>
  );
}
