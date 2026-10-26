import { Link } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { registering, sentotpapi, verifyotpapi } from "../../api/Auth/auth.api";
import AuthLayout from "./AuthLayout";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"details" | "verify" | "done">("details");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (step === "details") {
        const body = new FormData();
        body.append("email", email);
        const data = await sentotpapi(body);
        if (!data.success)
          throw new Error(
            "We couldn’t send your verification code. Please try again.",
          );
        setStep("verify");
      } else {
        const body = new FormData();
        body.append("email", email);
        body.append("otp", otp);
        const verified = await verifyotpapi(body);
        if (!verified.success)
          throw new Error(
            "That code wasn’t recognized. Please check and try again.",
          );
        const details = new FormData();
        details.append("name", name);
        details.append("email", email);
        details.append("password", password);
        const registered = await registering(details);
        if (!registered.success)
          throw new Error("We couldn’t create your account. Please try again.");
        setStep("done");
      }
    } catch (cause) {
      setError(
        cause instanceof TypeError || cause instanceof SyntaxError
          ? "Unable to reach your store. Please try again in a moment."
          : cause instanceof Error
            ? cause.message
            : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <AuthLayout>
      <span className="form-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
      <h2>
        {step === "details"
          ? "Make yourself at home"
          : step === "verify"
            ? "Check your inbox"
            : "You’re all set"}
        <span>.</span>
      </h2>
      <p className="form-intro">
        {step === "details" ? (
          "Create your account. Bring your store’s possibilities to life."
        ) : step === "verify" ? (
          <>
            Enter the four-digit code sent to{" "}
            <span className="otp-address">{email}</span>.
          </>
        ) : (
          "Your account has been created. Sign in to get started."
        )}
      </p>
      {step !== "done" ? (
        <form className="auth-form" onSubmit={submit}>
          {step === "details" ? (
            <>
              <label htmlFor="name">Full name</label>
              <div className="auth-input">
                <FiUser />
                <input
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <label htmlFor="register-email">Email address</label>
              <div className="auth-input">
                <FiMail />
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <label htmlFor="new-password">Password</label>
              <div className="auth-input">
                <FiLock />
                <input
                  id="new-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <label htmlFor="verification-code">Verification code</label>
              <div className="auth-input otp-input">
                <input
                  id="verification-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{4}"
                  maxLength={4}
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, ""))
                  }
                  required
                  aria-describedby="code-hint"
                />
              </div>
              <p id="code-hint" className="sign-in-note">
                Enter all four digits, including any zeros.
              </p>
            </>
          )}
          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}
          <button className="auth-submit" disabled={busy}>
            {busy
              ? "Just a moment…"
              : step === "details"
                ? "Create your account"
                : "Verify & create account"}
            <FiArrowRight />
          </button>
          {step === "verify" && (
            <button
              className="text-button"
              type="button"
              onClick={() => {
                setStep("details");
                setError("");
                setOtp("");
              }}
            >
              Use a different email address
            </button>
          )}
        </form>
      ) : (
        <Link
          className="auth-submit"
          style={{ marginTop: 25, textDecoration: "none" }}
          to="/login"
        >
          Continue to sign in <FiArrowRight />
        </Link>
      )}
      <div className="auth-register-prompt">
        Already part of Extreme?{" "}
        <Link to="/login">
          Sign in <FiArrowRight />
        </Link>
      </div>
    </AuthLayout>
  );
}
