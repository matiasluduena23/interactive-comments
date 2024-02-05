import { comments, currentUser } from '../data/data.json';
import Comment from './Comment';
import { useState } from 'react';

export default function CommentsList() {
    const [commentsState, setCommentsState] = useState(comments);

    const updateComment = (id, comment) => {
        setCommentsState(
            commentsState.map((c) => {
                if (c.id === id) {
                    return comment;
                } else {
                    return c;
                }
            })
        );
    };

    const addReply = (idComment, reply) => {
        setCommentsState(
            commentsState.map((c) => {
                if (c.id === idComment) {
                    return {
                        ...c,
                        replies: [
                            ...c.replies,
                            { id: c.replies.length + 1, ...reply },
                        ],
                    };
                } else {
                    return c;
                }
            })
        );
    };

    return (
        <>
            {commentsState.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                    updateComment={updateComment}
                    addReply={addReply}
                />
            ))}
        </>
    );
}
