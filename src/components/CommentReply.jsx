/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import {
  CommetsDistpachContext,
  CurrentUserContext,
} from "../context/ComentContext";
import Reply from "./Reply";
import ReplyToReply from "./ReplyToReply";
import CommentBody from "./CommentBody";
import { formatContentString } from "../logic/util";

export default function Comment({ comment, idComment }) {
  const dispatch = useContext(CommetsDistpachContext);
  const currentUser = useContext(CurrentUserContext);
  const {
    replies,
    user: { username },
    id,
  } = comment;

  const [textarea, setTextarea] = useState("@" + username + ", ");
  const [activeReply, setActiveReply] = useState(false);

  const updateReply = (field, data) => {
    const updateReply = { ...comment, [field]: data };
    dispatch({
      type: "updateReply",
      idComment,
      id,
      updateReply,
    });
  };

  const deleteReply = () => {
    dispatch({
      type: "deleteReply",
      idComment,
      id,
    });
  };

  const handleReply = () => {
    const newContent = formatContentString(textarea, username);
    const reply = {
      content: newContent,
      createdAt: "recently",
      score: 0,
      replyingTo: username,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
    };

    dispatch({
      type: "addReplytoReply",
      idComment,
      id,
      reply,
    });
    setActiveReply(false);
    setTextarea("@" + username + ", ");
  };

  return (
    <section>
      <CommentBody
        updateComment={updateReply}
        deleteReply={() => deleteReply(comment.id)}
        setActiveReply={() => setActiveReply(!activeReply)}
        comment={comment}
      />

      <div className="replies">
        {replies && replies.length > 0 && (
          <div>
            {replies.map((c) => (
              <ReplyToReply
                key={c.id}
                idComment={idComment}
                idReply={id}
                comment={c}
              />
            ))}
          </div>
        )}
      </div>
      {activeReply && (
        <Reply
          handleReply={handleReply}
          textarea={textarea}
          setTextarea={setTextarea}
        />
      )}
    </section>
  );
}
