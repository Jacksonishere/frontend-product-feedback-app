import React, { useState, useEffect, useCallback } from "react";
import LoginPanel from "../components/user/LoginPanel";
import FeedbackTags from "../components/feedback/FeedbackTags";
import Roadmap from "../components/Roadmap";

const NavBoxes = () => {
  const [hamOpen, setHamOpen] = useState(false);

  useEffect(() => {
    if (hamOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [hamOpen]);

  const closeHam = useCallback(() => {
    setHamOpen(false);
  }, []);

  return (
    <div className="relative z-20 md:flex md:items-stretch md:gap-2 lg:fixed lg:flex-col lg:max-w-[255px] lg:gap-5">
      <div
        onClick={closeHam}
        aria-hidden
        className={`fixed top-[72px] left-0 bottom-0 right-0 bg-backdrop transition-opacity duration-150 ${
          hamOpen ? "opacity-100 translate-x-0 " : "opacity-0 -translate-x-full"
        } md:hidden`}
      ></div>
      <LoginPanel hamOpen={hamOpen} setHamOpen={setHamOpen} />
      <div
        className={`fixed top-[72px] bottom-0 right-0 p-6 flex flex-col gap-6 w-[72%] transition-transform duration-150 ${
          hamOpen ? "translate-x-0" : "translate-x-full"
        } bg-blue-100 md:static md:flex-row md:gap-2 md:p-0 md:w-2/3 md:translate-x-0 lg:flex-col lg:w-full lg:gap-5`}
      >
        <FeedbackTags onClose={closeHam} />
        <Roadmap />
      </div>
    </div>
  );
};

export default NavBoxes;
