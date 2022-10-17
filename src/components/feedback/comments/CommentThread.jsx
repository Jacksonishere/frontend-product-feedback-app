import React from "react";
import Comment from "./Comment";

const CommentThread = ({ feedback }) => {
  return (
    <section className="default-cont">
      <h3
        className={`${feedback.num_comments ? "mb-6" : ""}`}
      >{`${feedback.num_comments} Comment(s)`}</h3>
      <div>
        {feedback.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentThread;
