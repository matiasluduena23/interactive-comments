/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import CommentReply from './CommentReply';
import Reply from './Reply';
import { CommetsDistpachContext } from '../context/ComentContext';
import { setLike, setUnLike } from '../hooks/useLike';
import plusSvg from '../assets/icon-plus.svg';
import minusSvg from '../assets/icon-minus.svg';
import replySvg from '../assets/icon-reply.svg';

export default function Comment({ comment, currentUser }) {
    const dispatch = useContext(CommetsDistpachContext);
    const {
        content,
        createdAt,
        score,
        user: { image, username },
        id,
        replies,
    } = comment;

    const [activeReply, setActiveReply] = useState(false);
    const [liked, setLiked] = useState('unlike');
    const [textarea, setTextarea] = useState('@' + username + ', ');

    const handleLike = () => {
        if (setLike(liked, setLiked)) {
            updateComment(id, { ...comment, score: score + 1 });
        }
    };

    const handleUnLike = () => {
        if (setUnLike(liked, setLiked)) {
            updateComment(id, { ...comment, score: score - 1 });
        }
    };

    const updateComment = (id, comment) => {
        dispatch({
            type: 'updateComment',
            id,
            comment,
        });
    };

    const handleReply = () => {
        const reply = {
            content: textarea,
            createdAt: Date.now(),
            score: 0,
            replyingTo: username,
            replies: [],
            user: {
                image: currentUser.image,
                username: currentUser.username,
            },
        };

        dispatch({
            type: 'addReply',
            id,
            reply,
        });
        setActiveReply(false);
    };

    return (
        <section>
            <article className="comment">
                <div className="col-1">
                    <div className="wrap-buttons">
                        <button className="button-like" onClick={handleLike}>
                            <img src={plusSvg} alt="plus image" />
                        </button>
                        <p className="score">{score}</p>
                        <button className="button-like" onClick={handleUnLike}>
                            <img src={minusSvg} alt="minus image" />
                        </button>
                    </div>
                </div>
                <div className="col-2">
                    <header>
                        <div className="header-col-1">
                            <img
                                className="header-col-1-img"
                                src={image.png}
                                alt="Profile photo"
                            />
                            <a className="header-col-1-username" href="#">
                                {username}
                            </a>
                            <p className="header-col-1-date">{createdAt}</p>
                        </div>
                        <div className="header-col-2">
                            <button
                                className="btn btn-reply"
                                onClick={() => setActiveReply(!activeReply)}
                            >
                                <img src={replySvg} alt="reply image" />
                                <span>Reply</span>
                            </button>
                        </div>
                    </header>
                    <p className="comment-text">{content}</p>
                </div>
            </article>
            <div className="replies">
                {replies.length > 0 && (
                    <div>
                        {replies.map((c) => (
                            <CommentReply
                                key={c.id}
                                idComment={id}
                                comment={c}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                )}
            </div>
            {activeReply && (
                <Reply
                    handleReply={handleReply}
                    textarea={textarea}
                    setTextarea={setTextarea}
                    image={currentUser.image}
                />
            )}
        </section>
    );
}
