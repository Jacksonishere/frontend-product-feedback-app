import React, { useState } from "react";
import LoginPanel from "../components/user/LoginPanel";
import FeedbackTags from "../components/feedback/FeedbackTags";
import Roadmap from "../components/Roadmap";

const NavBoxes = () => {
  const [hamOpen, setHamOpen] = useState(false);

  return (
    <div className="md:flex md:items-stretch md:gap-2 lg:flex-col lg:max-w-[255px] lg:gap-5">
      {/* For more reusability, use a top-level background component that takes in a callback and create a slice that would control show/hidden. */}
      <div
        onClick={() => setHamOpen(false)}
        aria-hidden
        className={`fixed top-0 left-0 bottom-0 w-[28%] bg-backdrop transition-opacity duration-150 ${
          hamOpen ? "opacity-100 translate-x-0 " : "opacity-0 -translate-x-full"
        } md:hidden`}
      ></div>
      <LoginPanel hamOpen={hamOpen} setHamOpen={setHamOpen} />
      <div
        className={`fixed top-[72px] bottom-0 right-0 p-6 flex flex-col gap-6 w-[72%] transition-transform duration-150 ${
          hamOpen ? "translate-x-0" : "translate-x-full"
        } bg-blue-100 md:static md:flex-row md:gap-2 md:p-0 md:w-2/3 md:translate-x-0 lg:flex-col lg:w-full lg:gap-5`}
      >
        <FeedbackTags />
        <Roadmap />
      </div>
    </div>
  );
};

export default NavBoxes;
