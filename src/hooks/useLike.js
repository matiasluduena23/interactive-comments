export function useLike(like, setLike) {
  if (like === "like") return false;
  if (like === "unlike") {
    setLike("like");
    return true;
  } else if (like === "dislike") {
    setLike("unlike");
    return true;
  }
}

export function useUnLike(like, setLike) {
  if (like === "dislike") return false;
  if (like === "like") {
    setLike("unlike");
    return true;
  } else if (like === "unlike") {
    setLike("dislike");
    return true;
  }
}
