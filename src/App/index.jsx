import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import HomePage from "../pages/HomePage";
import NewFeedbackPage from "../pages/NewFeedbackPage";
import FeedbackPage from "../pages/FeedbackPage";
import EditFeedbackPage from "../pages/EditFeedbackPage";
import Auth from "../pages/Auth";
import NotFound404 from "../pages/NotFound404";

// Components
import Flash from "../components/flash/Flash";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

// Utils
import ProtectedRoutes from "../components/utils/ProtectedRoutes";
import useLoginCheck from "../hooks/useLoginCheck";
import ScrollToTop from "../components/utils/ScrollToTop";
import PublicRoutes from "../components/utils/PublicRoutes";
import { FeedbackContextProvider } from "../context/FeedbacksContext";

const App = () => {
  useLoginCheck();

  return (
    <div className="max-w-7xl min-h-screen mx-auto md:px-10">
      <ScrollToTop />
      <Flash />
      <FeedbackContextProvider>
        <Routes>
          <Route index={true} path="/" element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/feedbacks/new" element={<NewFeedbackPage />} />
          </Route>
          <Route path="feedbacks/:id" element={<FeedbackPage />}>
            <Route path="edit" element={<EditFeedbackPage />} />
          </Route>

          <Route path="auth" element={<Auth />}>
            <Route path="/auth" element={<LoginForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignUpForm />} />
          </Route>

          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </FeedbackContextProvider>
    </div>
  );
};

export default App;
