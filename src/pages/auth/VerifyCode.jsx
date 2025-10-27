// src/pages/auth/Verify.jsx
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from '../../services/api';

export default function VerifyCode() {
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const pendingUser = JSON.parse(localStorage.getItem("pendingUser"));
  const initialUserName = pendingUser?.user_name || "";

  const initialValues = { user_name: initialUserName, otp: ["", "", "", "", "", ""] };

  const VerifySchema = Yup.object({
    user_name: Yup.string().required("Username required"),
    otp: Yup.array().of(Yup.string().required("Required")).length(6, "Enter 6 digits"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    setIsVerifying(true); 
    try {
      const otpString = values.otp.join("");
      
      // 1. CAPTURE THE RETURNED DATA (which includes the user)
      const data = await verifyOTP(values.user_name, otpString);

      // 2. Check for the redirect flag
      const pendingRedirect = localStorage.getItem("pendingAnalysisRedirect");
      
      if (pendingRedirect) {
        localStorage.removeItem("pendingAnalysisRedirect");
        navigate("/analysis", { replace: true }); // <-- Go to form
      } else {
          if (data.user && data.user.role === 'admin') {
            navigate("/admin-dashboard", { replace: true }); // <-- CORRECT: Go to admin dashboard
          } else {
            navigate("/dashboard", { replace: true }); // <-- Go to user dashboard
          }
      }
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
      setIsVerifying(false); 
    }
  };

  const resendCode = async () => {
    try {
      setResending(true);
      // 3. Get username from form, not email
      const pendingUser = JSON.parse(localStorage.getItem("pendingUser"));
      if (!pendingUser?.user_name) throw new Error("No username found");

      // 4. Use API.post and send username
      await API.post("/auth/resend-otp", {
        user_name: pendingUser.user_name,
      });

      alert("Verification code resent!");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setResending(false);
    }
  };

  const handleInput = (e, index, setFieldValue) => {
    const value = e.target.value.replace(/\D/g, "");
    setFieldValue(`otp[${index}]`, value);

    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name='otp[${index + 1}]']`);
      nextInput?.focus();
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center px-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Verify Your Account</h1>

          <Formik initialValues={initialValues} validationSchema={VerifySchema} onSubmit={handleSubmit}>
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <Field
                  name="user_name"
                  type="text"
                  placeholder="Username"
                  className="w-full border p-2 rounded-md mb-4"
                />
                <ErrorMessage name="user_name" component="div" className="text-red-500 text-sm" />

                <p className="text-sm text-yellow-600 mb-6">Enter the 6-digit code sent to your email</p>

                <div className="flex gap-2">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <Field
                        key={i}
                        name={`otp[${i}]`}
                        maxLength="1"
                        inputMode="numeric"
                        className="w-12 h-12 text-center border rounded outline-none focus:ring-2 focus:ring-[#f79436]"
                        onInput={(e) => handleInput(e, i, setFieldValue)}
                      />
                    ))}
                </div>
                <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-1" />

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-[#f79436] text-white rounded hover:bg-[#f79436]/90"
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </button>

                <button
                  type="button"
                  onClick={resendCode}
                  disabled={resending}
                  className="w-full py-2 border border-[#f79436] text-[#f79436] rounded hover:bg-[#f79436]/10"
                >
                  {resending ? "Resending..." : "Resend Code"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="w-1/2 bg-[#fff7f2] flex flex-col justify-center px-16">
        <h2 className="text-3xl font-bold mb-4">Almost There!</h2>
        <p className="text-lg">Verify your email to start your solar journey.</p>
      </div>
    </div>
  );
}