/* eslint-disable react/prop-types */
import { useState } from 'react';
import plusSvg from '../assets/icon-plus.svg';
import minusSvg from '../assets/icon-minus.svg';
import { setLike, setUnLike } from '../hooks/useLike';

export default function LikeButton({ update, score }) {
    const [liked, setLiked] = useState('unlike');

    const handleLike = () => {
        if (setLike(liked, setLiked)) {
            update(score + 1);
        }
    };

    const handleUnLike = () => {
        if (setUnLike(liked, setLiked)) {
            update(score - 1);
        }
    };

    return (
        <div className="wrap-buttons">
            <button className="button-like" onClick={handleLike}>
                <img src={plusSvg} alt="plus image" />
            </button>
            <p className="score">{score}</p>
            <button className="button-like" onClick={handleUnLike}>
                <img src={minusSvg} alt="minus image" />
            </button>
        </div>
    );
}
