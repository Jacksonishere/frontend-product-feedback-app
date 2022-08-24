import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// Pages
import Home from "../pages/Home";
// import Feedback from "../pages/Feedback";
import NewFeedback from "../pages/NewFeedback";
import NotFound404 from "../pages/NotFound404";

// Components
import Login from "../pages/Login";
import Signup from "../pages/Signup";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/feedback/new" element={<NewFeedback />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
