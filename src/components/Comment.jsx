import { useState } from 'react';
import CommentReply from './CommentReply';

export default function Comment({
    comment,
    updateComment,
    addReply,
    currentUser,
}) {
    const {
        content,
        createdAt,
        score,
        user: { username },
        id,
        replies,
    } = comment;

    const [activeReply, setActiveReply] = useState(false);
    const [like, setLike] = useState(false);
    const [unlike, setUnLike] = useState(false);
    const [textarea, setTextarea] = useState('@' + username + ', ');

    const handleLike = () => {
        if (like) return;
        if (unlike) {
            setUnLike(false);

            updateComment(id, { ...comment, score: score + 1 });
        } else if (!unlike) {
            setLike(true);
            //score set one up
            updateComment(id, { ...comment, score: score + 1 });
        }
    };

    const handleUnLike = () => {
        if (unlike) return;
        if (like) {
            setLike(false);
            updateComment(id, { ...comment, score: score - 1 });
        } else if (!like) {
            setUnLike(true);
            updateComment(id, { ...comment, score: score - 1 });
        }
    };

    const handleReply = () => {
        const reply = {
            content: textarea,
            createdAt: Date.now(),
            score: 0,
            replyingTo: username,
            user: {
                image: currentUser.image,
                username: currentUser.username,
            },
        };

        addReply(id, reply);
        setActiveReply(false);
    };

    console.log(replies);
    return (
        <article>
            <button onClick={handleLike}>+</button>
            <p>{score}</p>
            <button onClick={handleUnLike}>-</button>
            <p>{username}</p>
            <p>{createdAt}</p>
            <button onClick={() => setActiveReply(!activeReply)}>reply</button>
            <p>{content}</p>

            {replies.length > 0 && (
                <div>
                    {replies.map((c) => (
                        <CommentReply
                            key={c.id}
                            comment={c}
                            updateComment={updateComment}
                        />
                    ))}
                </div>
            )}
            {activeReply && (
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
            )}
        </article>
    );
}
