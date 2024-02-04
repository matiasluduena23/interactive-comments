import { comments } from '../data/data.json';
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
    return (
        <>
            {commentsState.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    updateComment={updateComment}
                />
            ))}
        </>
    );
}
