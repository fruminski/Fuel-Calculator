import React, { useState } from "react";
import "./Menu.css";
import LoginForm from "./LoginForm";

export default function Menu({ user, onLogin, onLogout }) {
  const [isOpen, setIsOpen] = useState("null");

  const handleMenu = () => {
    setIsOpen(isOpen === "open" ? "null" : "open");
  };

  return (
    <>
      <div className="menu" onClick={() => handleMenu()}>
        {user && (
          <p className="user">
            Logged in as &nbsp;<strong>{user.name}</strong>
          </p>
        )}

        {!user ? (
          <button className={isOpen}>Login</button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token"); // 🧹 Clear the token
              if (onLogout) onLogout();
            }}
          >
            Log out
          </button>
        )}

        <div />
      </div>
      {isOpen === "open" && <LoginForm onLogin={onLogin} user={user} />}
    </>
  );
}
