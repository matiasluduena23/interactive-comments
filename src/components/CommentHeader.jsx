/* eslint-disable react/prop-types */
import replySvg from "../assets/icon-reply.svg";
import deleteSvg from "../assets/icon-delete.svg";
import editSvg from "../assets/icon-edit.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../context/ComentContext";

export default function CommentHeader({
  comment,
  setActiveReply,
  deleteReply,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    createdAt,
    user: { username, image },
  } = comment;

  return (
    <header>
      <div className="header-col-1">
        <img className="header-col-1-img" src={image.png} alt="Profile photo" />
        <a href="#" className="header-col-1-username">
          {username}
        </a>
        {username === currentUser.username && (
          <span className="header-tag-current-user">you</span>
        )}
        <p className="header-col-1-date">{createdAt}</p>
      </div>
      <div className="header-col-2">
        {username === currentUser.username ? (
          <div className="wrap-btn">
            <button className="btn btn-delete" onClick={deleteReply}>
              <img src={deleteSvg} alt="reply image" />
              <span>Delete</span>
            </button>
            <button className="btn btn-edit">
              <img src={editSvg} alt="reply image" />
              <span>Edit</span>
            </button>
          </div>
        ) : (
          <button className="btn btn-reply" onClick={setActiveReply}>
            <img src={replySvg} alt="reply image" />
            <span>Reply</span>
          </button>
        )}
      </div>
    </header>
  );
}
