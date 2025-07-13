import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      const res = await fetch(
        "https://fuel-calculator.onrender.com/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword })
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");

      setSuccess("Password updated successfully! You can now log in.");
      setNewPassword("");
      setConfirm("");

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (!token) return <p>Invalid or missing token.</p>;

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>Reset Password</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            required
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
