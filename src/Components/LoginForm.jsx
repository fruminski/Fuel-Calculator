import { useState, useEffect } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  // Prefill email if remembered
  useEffect(() => {
    const remembered = localStorage.getItem("rememberedEmail");
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  // Hide form if user is logged in
  if (user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === "login" ? "/login" : "/register";
    const payload =
      mode === "login" ? { email, password } : { name, email, password };

    try {
      const res = await fetch(`http://localhost:5000/auth${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      localStorage.setItem("token", data.token);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Here you would call your backend to send a reset email
    alert(`Password reset link sent to ${forgotEmail}`);
    setShowForgot(false);
    setForgotEmail("");
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>Welcome</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!showForgot ? (
          <form className="login-form" onSubmit={handleSubmit}>
            {mode === "register" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {mode === "login" && (
              <div className="forgotRemember">
                <div>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe((v) => !v)}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForgot(true);
                  }}
                >
                  Forgot password?
                </a>
              </div>
            )}
            <button type="submit">
              {mode === "login" ? "Log In" : "Create Account"}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              required
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <button type="submit">Send reset link</button>
            <button type="button" onClick={() => setShowForgot(false)}>
              Back to login
            </button>
          </form>
        )}
        <div className="signUp">
          <p>
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button type="button" onClick={() => setMode("register")}>
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => setMode("login")}>
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;