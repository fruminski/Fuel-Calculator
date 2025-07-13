import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JourneyCalculator from "../JourneyCalculator";
import ResetPassword from "../ResetPassword";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      setUser({ email: "temp@email.com" }); // replace with real logic later
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<JourneyCalculator user={user} setUser={setUser} />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
