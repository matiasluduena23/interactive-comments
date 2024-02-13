/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { CommetsDistpachContext } from '../context/ComentContext';
import { setLike, setUnLike } from '../hooks/useLike';
import Reply from './Reply';
import ReplyToReply from './ReplyToReply';
import plusSvg from '../assets/icon-plus.svg';
import minusSvg from '../assets/icon-minus.svg';
import replySvg from '../assets/icon-reply.svg';
import deleteSvg from '../assets/icon-delete.svg';
import editSvg from '../assets/icon-edit.svg';

export default function Comment({ comment, idComment, currentUser }) {
    const dispatch = useContext(CommetsDistpachContext);
    const {
        content,
        createdAt,
        score,

        replies,
        user: { username, image },
        id,
    } = comment;

    const [textarea, setTextarea] = useState('@' + username + ', ');

    const [activeReply, setActiveReply] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        if (setLike(liked, setLiked)) {
            updateReply(idComment, id, { ...comment, score: score + 1 });
        }
    };

    const handleUnLike = () => {
        if (setUnLike(liked, setLiked)) {
            updateReply(idComment, id, { ...comment, score: score - 1 });
        }
    };

    const updateReply = (id, idReply, reply) => {
        dispatch({
            type: 'updateReply',
            id,
            idReply,
            reply,
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
                            <a href="#" className="header-col-1-username">
                                {username}
                            </a>
                            {username === currentUser.username && (
                                <span className="header-tag-current-user">
                                    you
                                </span>
                            )}
                            <p className="header-col-1-date">{createdAt}</p>
                        </div>
                        <div className="header-col-2">
                            {username === currentUser.username ? (
                                <div className="wrap-btn">
                                    <button className="btn btn-delete">
                                        <img
                                            src={deleteSvg}
                                            alt="reply image"
                                        />
                                        <span>Delete</span>
                                    </button>
                                    <button className="btn btn-edit">
                                        <img src={editSvg} alt="reply image" />
                                        <span>Edit</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-reply"
                                    onClick={() => setActiveReply(!activeReply)}
                                >
                                    <img src={replySvg} alt="reply image" />
                                    <span>Reply</span>
                                </button>
                            )}
                        </div>
                    </header>
                    <p className="comment-text">{content}</p>
                </div>
            </article>

            {replies && replies.length > 0 && (
                <div>
                    {replies.map((c) => (
                        <ReplyToReply
                            key={c.id}
                            idComment={id}
                            comment={c}
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            )}
            {activeReply && (
                <Reply
                    handleReply={handleReply}
                    image={currentUser.image}
                    textarea={textarea}
                    setTextarea={setTextarea}
                />
            )}
        </section>
    );
}
