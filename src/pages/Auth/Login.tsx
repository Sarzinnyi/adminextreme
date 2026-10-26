import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import type { FormEvent } from "react";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { Acontext } from "./Acontext";
import { usingContext } from "../../context/Context";
import AuthLayout from "./AuthLayout";
export default function Login() {
  const { url } = usingContext();
  const context = useContext(Acontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function login(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const body = new FormData();
      body.append("email", email);
      body.append("password", password);
      const response = await fetch(`${url}/api/admin/check`, {
        method: "POST",
        credentials: "include",
        body,
      });
      if (!response.ok)
        throw new Error(
          "We couldn’t reach your store. Please try again in a moment.",
        );
      const data = await response.json();
      if (!data.success) {
        setError(
          "The email or password wasn’t recognized. Please check and try again.",
        );
        return;
      }
      if (!(await context?.fetchuser()))
        throw new Error(
          "Your session couldn’t be loaded. Please sign in again.",
        );
    } catch (cause) {
      setError(
        cause instanceof TypeError
          ? "Unable to connect to your store. Please check your connection and try again."
          : cause instanceof Error
            ? cause.message
            : "Unable to sign in. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <AuthLayout>
      <span className="form-eyebrow">YOUR WORKSPACE AWAITS</span>
      <h2>
        Welcome back<span>.</span>
      </h2>
      <p className="form-intro">
        Sign in to your account and pick up where you left off.
      </p>
      <form className="auth-form" onSubmit={login}>
        <label htmlFor="email">Email address</label>
        <div className="auth-input">
          <FiMail />
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className="auth-input">
          <FiLock />
          <input
            id="password"
            type={visible ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <p className="sign-in-note">Use the account connected to your store.</p>
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}
        <button className="auth-submit" disabled={busy}>
          {busy ? "Signing you in…" : "Sign in to workspace"}
          <FiArrowRight />
        </button>
      </form>
      <div className="auth-register-prompt">
        New to Extreme?{" "}
        <Link to="/register">
          Create an account <FiArrowRight />
        </Link>
      </div>
      <div className="auth-trust">
        <span />A little less admin. A lot more possibility.
      </div>
    </AuthLayout>
  );
}
