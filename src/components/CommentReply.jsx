/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import {
    CommetsDistpachContext,
    CurrentUserContext,
} from '../context/ComentContext';
import Reply from './Reply';
import ReplyToReply from './ReplyToReply';
import CommentBody from './CommentBody';

export default function Comment({ comment, idComment }) {
    const dispatch = useContext(CommetsDistpachContext);
    const currentUser = useContext(CurrentUserContext);
    const {
        replies,
        user: { username },
        id,
    } = comment;

    const [textarea, setTextarea] = useState('@' + username + ', ');
    const [activeReply, setActiveReply] = useState(false);

    const updateReply = (score) => {
        const updateReply = { ...comment, score: score };
        dispatch({
            type: 'updateReply',
            idComment,
            id,
            updateReply,
        });
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

        dispatch({
            type: 'addReplytoReply',
            idComment,
            id,
            reply,
        });
        setActiveReply(false);
    };

    return (
        <section>
            <CommentBody
                updateComment={updateReply}
                setActiveReply={() => setActiveReply(!activeReply)}
                comment={comment}
            />

            {replies && replies.length > 0 && (
                <div>
                    {replies.map((c) => (
                        <ReplyToReply key={c.id} idComment={id} comment={c} />
                    ))}
                </div>
            )}
            {activeReply && (
                <Reply
                    handleReply={handleReply}
                    textarea={textarea}
                    setTextarea={setTextarea}
                />
            )}
        </section>
    );
}
