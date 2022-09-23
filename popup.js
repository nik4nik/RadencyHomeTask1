const [popupBackground, popup, closePopupButton] = [
    ".popup__bg",
    ".popup",
    ".close-popup",
  ].map((e) => document.querySelector(e)),
  // Correspondence of elements of the todoItems table to elements of the archivedItems table by creation time
  time2Item = new Map(),
  hidePopup = () =>
    [popupBackground, popup].forEach((e) => e.classList.remove("active")),
  initPopup = (tr) => {
    const arr = Array.from(tr.getElementsByTagName("td")).map(
      (e) => e.textContent
    );
    todo.currentTR = tr;
    popupBackground.classList.add("active");
    popup.classList.add("active");
    popup[0].value = arr[1]; // action
    popup[1].value = arr[3]; // category
    popup[2].value = arr[4]; // content
  };

createNote.addEventListener("click", (e) => {
  e.preventDefault();
  popupBackground.classList.add("active");
  popup.classList.add("active");
});

btnArchivedNotes.addEventListener("click", (e) => {
  ArchivedNotes.hidden = !ArchivedNotes.hidden;
  btnArchivedNotes.innerText = ArchivedNotes.hidden
    ? "Archive"
    : (redrawArchive(), "Hide the archive");
});

closePopupButton.addEventListener("click", () => hidePopup());
document.addEventListener(
  "click",
  (e) => e.target === popupBackground && hidePopup()
);
