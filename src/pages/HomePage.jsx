import React from "react";

import NavBoxes from "../components/NavBoxes";
import NewFeedbackNav from "../components/feedback/NewFeedbackNav";
import Feedbacks from "../components/feedback/Feedbacks";

import { FeedbackContextProvider } from "../context/FeedbacksContext";

const HomePage = () => {
  return (
    <div className="md:px-0 md:pt-14 lg:flex lg:items-start lg:gap-6">
      <NavBoxes />
      <section className="w-full lg:ml-[288px]">
        <FeedbackContextProvider>
          <NewFeedbackNav />
          <Feedbacks />
        </FeedbackContextProvider>
      </section>
    </div>
  );
};

export default HomePage;
