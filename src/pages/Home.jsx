import React from "react";

import NavBoxes from "../components/NavBoxes";
import NewFeedbackNav from "../components/feedback/NewFeedbackNav";

const Home = () => {
  return (
    <div className="md:px-0 lg:flex lg:items-start lg:gap-6">
      <NavBoxes />
      <div className="w-full">
        <NewFeedbackNav />
      </div>
    </div>
  );
};

export default Home;
