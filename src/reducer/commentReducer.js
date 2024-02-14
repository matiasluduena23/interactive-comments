export default function commentReducer(comments, action) {
    switch (action.type) {
        case 'updateComment': {
            return comments.map((c) => {
                if (c.id === action.id) {
                    return action.updateComment;
                } else {
                    return c;
                }
            });
        }

        case 'addReply': {
            return comments.map((c) => {
                if (c.id === action.id) {
                    return {
                        ...c,
                        replies: [
                            ...c.replies,
                            { id: c.replies.length + 1, ...action.reply },
                        ],
                    };
                } else {
                    return c;
                }
            });
        }

        case 'updateReply': {
            return comments.map((c) => {
                if (c.id === action.idComment) {
                    return {
                        ...c,
                        replies: c.replies.map((r) => {
                            if (r.id === action.id) {
                                return action.updateReply;
                            } else {
                                return r;
                            }
                        }),
                    };
                } else {
                    return c;
                }
            });
        }

        case 'addReplytoReply': {
            return comments.map((c) => {
                if (c.id === action.id) {
                    return {
                        ...c,
                        replies: c.replies.map((r) => {
                            console.log('object');

                            if (r.id === action.idReply) {
                                console.log('update');
                                return {
                                    ...r.replies,
                                    replies: [
                                        ...r.replies,
                                        {
                                            id: c.replies.length + 1,
                                            ...action.reply,
                                        },
                                    ],
                                };
                            } else {
                                console.log('no update');
                                return r;
                            }
                        }),
                    };
                } else {
                    return c;
                }
            });
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
