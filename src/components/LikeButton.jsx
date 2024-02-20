/* eslint-disable react/prop-types */
import { useState } from "react";
import plusSvg from "../assets/icon-plus.svg";
import minusSvg from "../assets/icon-minus.svg";
import { setLike, setUnLike } from "../logic/util";

export default function LikeButton({ update, score }) {
  const [liked, setLiked] = useState("unlike");

  const handleLike = () => {
    if (setLike(liked, setLiked)) {
      update(["score"], score + 1);
    }
  };

  const handleUnLike = () => {
    if (setUnLike(liked, setLiked)) {
      update(["score"], score - 1);
    }
  };

  return (
    <div className="wrap-buttons">
      <button
        className={liked === "like" ? "like-active " : undefined}
        onClick={handleLike}
      >
        <img src={plusSvg} alt="plus image" />
      </button>
      <p className="score">{score}</p>
      <button
        className={liked === "dislike" ? "like-active " : undefined}
        onClick={handleUnLike}
      >
        <img src={minusSvg} alt="minus image" />
      </button>
    </div>
  );
}
