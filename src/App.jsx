import { comments } from './data/data.json';
import Comment from './components/Comment';

function App() {
    return (
        <>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </>
    );
}

export default App;
