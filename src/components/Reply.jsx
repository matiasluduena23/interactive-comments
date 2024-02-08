import { useState } from "react";
import React from "react";

export default function Reply({ handleReply, username }) {
  const [textarea, setTextarea] = useState("@" + username + ", ");

  return (
    <div className="flex">
      <img src="" alt="image" />
      <textarea
        name="postContent"
        rows={4}
        cols={40}
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
      />
      <button onClick={handleReply}>Reply</button>
    </div>
  );
}
