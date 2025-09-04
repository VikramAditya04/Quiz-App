// Decode HTML entities from API response
export function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Shuffle array (used for randomizing options)
export function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
