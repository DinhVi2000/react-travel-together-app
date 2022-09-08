export const dateSortDesc = (array, dateType) => {
  !dateType && (dateType = "createdDate");
  if (array.length > 0) {
    array.sort(
      (a, b) => Number(new Date(b[dateType])) - Number(new Date(a[dateType]))
    );
  }
  return array;
};

export const covertToTagContent = (ref, content, filterByTag) => {
  content.split(" ").forEach((text) => {
    if (text.includes("#")) {
      let newText = document.createElement("span");
      newText.innerText = text + " ";
      newText.className = "text-blue-500 cursor-pointer";
      newText.onclick = () => {
        filterByTag(text);
      };
      ref.current.appendChild(newText);
    } else {
      let textSpace = text + " ";
      ref.current.innerHTML += textSpace;
    }
  });
};
