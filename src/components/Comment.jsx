import { useState } from 'react';
import CommentReply from './CommentReply';

export default function Comment({ comment, updateComment }) {
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
            {/* {replies.map((reply) => (
                <Comment
                    id={reply.id}
                    comment={reply}
                    updateComment={updateComment}
                />
            ))} */}

            {activeReply && (
                <div className="flex">
                    <img src="" alt="image" />
                    <textarea
                        name="postContent"
                        defaultValue={'@' + username + ', '}
                        rows={4}
                        cols={40}
                    />
                    <button>Reply</button>
                </div>
            )}
        </article>
    );
}
