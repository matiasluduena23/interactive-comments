/* eslint-disable react/prop-types */
import { CurrentUserContext } from "../context/ComentContext";
import { useContext } from "react";

export default function Reply({ handleReply, textarea, setTextarea }) {
  const currentUser = useContext(CurrentUserContext);
  const placeholder = textarea ? "" : "Add a comment...";

  return (
    <article className="reply">
      <img className="reply-img" src={currentUser.image.png} alt="image" />
      <textarea
        className="reply-textarea"
        name="postContent"
        placeholder={placeholder}
        rows={3}
        cols={30}
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
      />
      <button className="reply-btn" onClick={handleReply}>
        Reply
      </button>
    </article>
  );
}
