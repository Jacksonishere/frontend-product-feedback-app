import React, { useState, useEffect } from "react";
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
import useLoginCheck from "../hooks/useLoginCheck";
import PublicRoutes from "../components/utils/PublicRoutes";

const App = () => {
  useLoginCheck();

  return (
    <div className="max-w-7xl min-h-screen overflow-hidden mx-auto md:pt-14 md:px-10">
      <Flash />
      <Routes>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth" element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/feedback/new" element={<NewFeedback />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
