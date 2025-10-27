// src/pages/InstallerContract.jsx
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SignatureCanvas from "react-signature-canvas";
import API from "../../services/api";

export default function InstallerContract() {
  const { user, updateUser, token } = useAuth();
  const navigate = useNavigate();
  const sigCanvas = useRef();

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");

  // Get user's IP for compliance
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip))
      .catch(() => setIpAddress("unknown"));
  }, []);

  const clearSignature = () => sigCanvas.current.clear();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree || sigCanvas.current.isEmpty()) {
      alert("Please agree and sign before submitting.");
      return;
    }

    setLoading(true);
    try {
      const signatureData = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      const payload = {
        signature: signatureData,
        signedAt: new Date().toISOString(), // This is the ISO string
        ipAddress,
      };

      // --- 2. Use API.post instead of fetch ---
      // This is cleaner and automatically uses your base URL
      // and Authorization token from your API service.
      const res = await API.post(
        `/installers/${user.id}/contract`,
        payload
      );

      // 3. Update context with the *user object* from the backend
      if (res.data.user) {
        updateUser(res.data.user);
      } else {
        // Fallback (though backend should always return user)
        updateUser({ ...user, contractAccepted: true });
      }
      
      // 4. Navigate to the INSTALLER dashboard!
      navigate("/installer-dashboard", { replace: true });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error submitting contract. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-2xl p-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-xl font-bold text-primary space-x-2 mx-auto mb-4">
            <img src="src/assets/1.svg" alt="Home" className="h-24" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">
         SOLARMATCH INSTALLER AGREEMENT
        </h1>

        <div className="h-[420px] overflow-y-auto border border-gray-200 rounded-lg p-6 bg-gray-50 text-sm leading-relaxed">
          <p><strong>Effective Date:</strong> [Date of Acceptance]</p>
          <p>
            This Agreement is entered into between <strong>SolarMatch</strong> (“the
            Platform”, “we”, “our”, “us”) and the registered{" "}
            <strong>Installer</strong> (“you”, “your”, “the Installer”).
          </p>

          <h2 className="font-semibold mt-4">1. Purpose</h2>
          <p>
            SolarMatch is a digital platform that connects verified solar
            installers with potential customers seeking solar energy solutions.
            We facilitate <strong>lead generation</strong> and may offer
            customers <strong>financing options</strong> through our financial
            partners. This Agreement outlines your responsibilities as an
            installer using the SolarMatch platform.
          </p>

          <h2 className="font-semibold mt-4">2. Scope of Services</h2>
          <ul className="list-disc ml-6">
            <li>
              SolarMatch provides you with <strong>sales leads</strong> and
              inquiries submitted by customers through our platform.
            </li>
            <li>
              You are responsible for <strong>contacting, negotiating, and serving
              customers</strong> professionally and lawfully.
            </li>
            <li>
              SolarMatch <strong>does not process customer payments</strong> or
              participate in transactions between you and your customers.
            </li>
            <li>
              You agree to handle all client communications, quotations,
              installations, and after-sales support directly.
            </li>
          </ul>

          <h2 className="font-semibold mt-4">3. Installer Responsibilities</h2>
          <ul className="list-disc ml-6">
            <li>
              You are a <strong>licensed and qualified solar installer</strong>{" "}
              in compliance with local laws and regulations.
            </li>
            <li>
              You will represent SolarMatch and yourself with{" "}
              <strong>honesty, professionalism, and transparency</strong>.
            </li>
            <li>
              You will <strong>not mislead customers</strong>, provide false
              information, or engage in unethical business practices.
            </li>
            <li>
              You will <strong>honor all warranties and service agreements</strong>{" "}
              made directly between you and your customers.
            </li>
          </ul>
          <p className="mt-2">
            Any misconduct or verified complaint may result in{" "}
            <strong>suspension or removal</strong> from SolarMatch.
          </p>

          <h2 className="font-semibold mt-4">4. Fees and Payment</h2>
          <ul className="list-disc ml-6">
            <li>
              Installers pay SolarMatch a <strong>lead access fee</strong> or
              other service charges as agreed.
            </li>
            <li>
              Any <strong>discounts or promotions</strong> will be agreed jointly
              between you and SolarMatch or funded solely by SolarMatch at our
              discretion.
            </li>
            <li>
              You are not entitled to compensation for SolarMatch-funded
              promotions unless otherwise agreed.
            </li>
          </ul>

          <h2 className="font-semibold mt-4">5. Liability and Disclaimer</h2>
          <ul className="list-disc ml-6">
            <li>
              SolarMatch <strong>does not guarantee</strong> that any lead will
              result in a successful sale or installation.
            </li>
            <li>
              SolarMatch is <strong>not responsible</strong> for losses,
              damages, or disputes arising from your dealings with customers.
            </li>
            <li>
              All business conducted with customers obtained through SolarMatch
              is <strong>at your own risk</strong>.
            </li>
          </ul>

          <h2 className="font-semibold mt-4">6. Customer Financing</h2>
          <ul className="list-disc ml-6">
            <li>
              SolarMatch may connect customers with{" "}
              <strong>financial institutions</strong> for solar financing.
            </li>
            <li>
              Financing arrangements are strictly between the customer and the
              financial institution.
            </li>
            <li>
              You agree to cooperate in providing required documentation when
              applicable.
            </li>
          </ul>

          <h2 className="font-semibold mt-4">7. Termination</h2>
          <ul className="list-disc ml-6">
            <li>Either party may terminate this Agreement at any time.</li>
            <li>
              Upon termination, you must cease representing yourself as
              affiliated with SolarMatch.
            </li>
            <li>
              SolarMatch reserves the right to suspend or remove your account in
              cases of misconduct, fraud, or repeated customer complaints.
            </li>
          </ul>

          <h2 className="font-semibold mt-4">8. Acceptance of Terms</h2>
          <p>
            By clicking “I Accept” and electronically signing below, you
            acknowledge that you have read, understood, and agree to be bound by
            this Agreement.
          </p>
        </div>

        {/* Acceptance Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-5 w-5 text-yellow-500 border-gray-300 rounded"
            />
            <span>I have read and agree to the SolarMatch Installer Agreement</span>
          </label>

          <div>
            <p className="text-sm font-medium mb-2 text-gray-700">
              Draw your signature below:
            </p>
            <div className="border rounded-md bg-gray-50">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  width: 450,
                  height: 200,
                  className: "sigCanvas",
                }}
              />
            </div>
            <button
              type="button"
              onClick={clearSignature}
              className="text-sm text-blue-500 hover:underline mt-1"
            >
              Clear signature
            </button>
          </div>

          <button
            type="submit"
            disabled={!agree || loading}
            className="w-full bg-[#f79436] hover:bg-[#e68529] text-white py-2 rounded-md transition disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
