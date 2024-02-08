export default function commentReducer(comments, action) {
  switch (action.type) {
    case "updateComment": {
      return comments.map((c) => {
        if (c.id === action.id) {
          return action.comment;
        } else {
          return c;
        }
      });
    }

    case "addReply": {
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

    case "updateReply": {
      return comments.map((c) => {
        if (c.id === action.id) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === action.idReply) {
                return action.reply;
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

    case "addReplytoReply": {
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
