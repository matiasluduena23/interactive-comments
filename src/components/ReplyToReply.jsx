/* eslint-disable react/prop-types */
import { useState } from 'react';
import Reply from './Reply';

export default function Comment({ comment, idComment, currentUser }) {
    const {
        content,
        createdAt,
        score,
        user: { username },
    } = comment;

    const [textarea, setTextarea] = useState('@' + username + ', ');
    const [activeReply, setActiveReply] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {};

    const handleUnLike = () => {};
    const handleReply = () => {};

    return (
        <article style={{ backgroundColor: 'lightblue' }}>
            <button onClick={handleLike}>+</button>
            <p>{score}</p>
            <button onClick={handleUnLike}>-</button>
            <p>{username}</p>
            <p>{createdAt}</p>
            <button onClick={() => setActiveReply(!activeReply)}>reply</button>
            <p>{content}</p>

            {activeReply && (
                <Reply
                    handleReply={handleReply}
                    image={currentUser.image}
                    textarea={textarea}
                    setTextarea={setTextarea}
                />
            )}
        </article>
    );
}
