function highlight() {
  const regexInput = document.getElementById("regex-input").value;
  const textInput = document.getElementById("text-input").value;
  const regex = RegExp(regexInput, "g");

  // get content and position of all matched strings
  // matchAll returns matches in
  // ["match", "capture group1", "capture group2", index: int, ...] format
  const matches = Array.from(textInput.matchAll(regex), m => ({
    matchedString: m[0],
    index: m.index
  }))
    // exclude empty strings
    .filter(m => m.matchedString);

  // highlight
  let pointer = 0;
  let highlightedResult = [];
  const left = "<span>";
  const right = "</span>";
  for (match of matches) {
    // push original(not matched) text
    if (pointer < match.index) {
      highlightedResult.push(textInput.substring(pointer, match.index));
    }
    // find the next index that is not included in the match
    let endIndex = match.index + match.matchedString.length;
    // push matched text with modification
    highlightedResult.push(left);
    highlightedResult.push(textInput.substring(match.index, endIndex));
    highlightedResult.push(right);
    // set pointer to the next starting character
    pointer = endIndex;
  }
  // push original(not matched) text from the last matched string to the end of textInput
  if (pointer < textInput.length) {
    highlightedResult.push(textInput.substr(pointer, textInput.length));
  }

  document.getElementById(
    "highlighted-result"
  ).innerHTML = highlightedResult.join("");
}
