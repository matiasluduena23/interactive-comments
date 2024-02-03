export default function Comment({ comment }) {
    const { content, createdAt, score, user, username } = comment;
    console.log(content);
    return (
        <article>
            <button>+</button>
            <p>{score}</p>
            <button>-</button>
            <p>{username}</p>
            <p>{createdAt}</p>
            <button>reply</button>
            <p>{content}</p>
        </article>
    );
}
