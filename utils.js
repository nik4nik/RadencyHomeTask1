const categories = ["Idea", "Quote", "RandomThought", "Task"],
  itemsByCategories = document.getElementById("itemsByCategories"),
  todoItems = document.getElementById("todoItems"),
  svgPath = "./img/",
  notesByCategory = () => {
    const activeNotes = new Map(),
      archivedNotes = new Map();

    Array.from(todoItems.getElementsByTagName("tr")).forEach((e) => {
      const category = e.childNodes[7].textContent;
      if (categories.includes(category)) {
        const tmp = e.hidden ? archivedNotes : activeNotes;
        tmp[category] = ++tmp[category] || 1;
      }
    });

    itemsByCategories.innerHTML = categories
      .map((category) =>
        archivedNotes[category] || activeNotes[category]
          ? `<tr>
			<td><img class='pict' src=${svgPath}${category}.svg></td>
			<td>${category}</td>
			<td>${activeNotes[category] || 0}</td>
			<td>${archivedNotes[category] || 0}</td>
		</tr>`
          : ""
      )
      .join("");
  },
  redrawArchive = () => {
    archivedItems.innerHTML = Array.from(todoItems.getElementsByTagName("tr"))
      .filter((e) => e.hidden)
      .map((e, i) => {
        time2Item[e.childNodes[5].textContent] = e;
        return `<tr>${e.innerHTML}</tr>`;
      })
      .join("")
      .replaceAll("archive", "unarchive");
  };
