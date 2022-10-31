import React, { useState, useEffect, useCallback, useMemo } from "react";
import Comment from "./Comment";

import { useGetParentCommentsQuery } from "../../../api/feedbackApiSlice";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

import Spinner from "../../utils/Spinner";
import CommentForm from "./CommentForm";

const CommentThread = ({ feedback }) => {
  const [offset, setOffset] = useState(1);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const { isFetching, data } = useGetParentCommentsQuery({
    offset,
    feedback_id: feedback.id,
  });
  const [comments, setComments] = useState([]);

  const parentCommentIDs = useMemo(() => {
    const IDs = new Set();
    if (comments) {
      comments.forEach((topComment) => {
        IDs.add(topComment.id);
      });
    }
    return IDs;
  }, [comments]);

  useEffect(() => {
    if (data) {
      setCanFetchMore(data.length === 0 ? false : true);
      setComments((currComments) => [
        ...currComments,
        ...data.filter(({ id }) => !parentCommentIDs.has(id)),
      ]);
    }
  }, [data]);

  const infiniteScrollHandler = useCallback(() => {
    setOffset((curr) => curr + 1);
  }, []);

  const infiniteScrollTrigger = useInfiniteScroll({
    isFetching,
    canFetchMore,
    infiniteScrollHandler,
  });

  const appendNewComment = (newParentComment) => {
    setComments((currComments) => [newParentComment, ...currComments]);
  };

  return (
    <>
      <CommentForm appendNewComment={appendNewComment} />
      <section className="default-cont">
        <h3 className={`${comments ? "mb-6" : ""}`}>{`${
          comments?.length ? feedback.num_comments : 0
        } Comment(s)`}</h3>
        <div>
          {comments.map((comment, i) =>
            i === comments.length - 1 ? (
              <Comment
                infiniteScroll={infiniteScrollTrigger}
                key={comment.id}
                comment={comment}
              />
            ) : (
              <Comment key={comment.id} comment={comment} />
            )
          )}
          {isFetching && (
            <div className="mt-6">
              <Spinner />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CommentThread;
