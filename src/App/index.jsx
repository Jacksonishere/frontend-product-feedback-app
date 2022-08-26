import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "../pages/Home";
import NewFeedback from "../pages/NewFeedback";
import Auth from "../pages/Auth";
import NotFound404 from "../pages/NotFound404";

// Components
import Flash from "../components/flash/Flash";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

import ProtectedRoutes from "../components/utils/ProtectedRoutes";

const App = () => {
  return (
    <div className="App h-full overflow-hidden">
      {/* <button
        type="button"
        onClick={() => {
          setUser(1);
          if (location.state?.from) {
            navigate(location.state.from);
          }
        }}
      >
        Login
      </button>
      <button type="button" onClick={() => setUser(null)}>
        Logout
      </button> */}
      <Flash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/feedback/new" element={<NewFeedback />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          {/* <Route path="/auth" element={<Login />} /> */}
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
