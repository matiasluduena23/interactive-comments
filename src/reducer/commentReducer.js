export default function commentReducer(comments, action) {
  switch (action.type) {
    case "updateComment": {
      return comments.map((c) => {
        if (c.id === action.id) {
          return action.updateComment;
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

    case "deleteReply": {
      return comments.map((c) => {
        if (c.id === action.idComment) {
          return {
            ...c,
            replies: c.replies.filter((r) => r.id !== action.id),
          };
        } else {
          return c;
        }
      });
    }

    case "addReplytoReply": {
      return comments.map((c) => {
        if (c.id === action.idComment) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === action.id) {
                const id = r.replies ? r.replies.length + 1 : 1;
                if (r.replies)
                  return {
                    ...r,
                    replies: [
                      ...r.replies,
                      {
                        id,
                        ...action.reply,
                      },
                    ],
                  };
                else
                  return {
                    ...r,
                    replies: [
                      {
                        id,
                        ...action.reply,
                      },
                    ],
                  };
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

    case "updateReplytoReply": {
      return comments.map((c) => {
        if (c.id === action.idComment) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === action.idReply) {
                return {
                  ...r,
                  replies: r.replies.map((rr) => {
                    if (rr.id === action.id) {
                      return action.updateReply;
                    } else {
                      return rr;
                    }
                  }),
                };
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

    case "deleteReplytoReply": {
      return comments.map((c) => {
        if (c.id === action.idComment) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === action.idReply) {
                return {
                  ...r,
                  replies: r.replies.filter((rr) => rr.id !== action.id),
                };
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

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
