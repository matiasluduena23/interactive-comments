import { comments, currentUser } from '../data/data.json';
import Comment from './Comment';
import commentReducer from '../reducer/commentReducer';
import { useReducer } from 'react';
import {
    CommetsDistpachContext,
    CommetsContext,
    CurrentUserContext,
} from '../context/ComentContext';

export default function CommentsList() {
    const [tasks, dispatch] = useReducer(commentReducer, comments);

    return (
        <CommetsContext.Provider value={tasks}>
            <CurrentUserContext.Provider value={currentUser}>
                <CommetsDistpachContext.Provider value={dispatch}>
                    {tasks.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </CommetsDistpachContext.Provider>
            </CurrentUserContext.Provider>
        </CommetsContext.Provider>
    );
}
