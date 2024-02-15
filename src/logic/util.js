export function setLike(like, setLike) {
  if (like === "like") return false;
  if (like === "unlike") {
    setLike("like");
    return true;
  } else if (like === "dislike") {
    setLike("unlike");
    return true;
  }
}

export function setUnLike(like, setLike) {
  if (like === "dislike") return false;
  if (like === "like") {
    setLike("unlike");
    return true;
  } else if (like === "unlike") {
    setLike("dislike");
    return true;
  }
}

export function formatContentString(text, username) {
  return text.includes(`@${username},`)
    ? text.slice(username.length + 2)
    : text;
}
