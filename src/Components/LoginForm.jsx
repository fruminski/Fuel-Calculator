import { useState } from "react";
import "./LoginForm.css"; // Optional: Add styling later

const LoginForm = ({ onLogin, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");

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
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>Welcome</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
          <button type="submit">
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>
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
