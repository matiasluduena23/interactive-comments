/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function Reply({ handleReply, image, textarea, setTextarea }) {
    return (
        <article className="reply">
            <img className="reply-img" src={image.png} alt="image" />
            <textarea
                className="reply-textarea"
                name="postContent"
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
