const todo = {
  currentTR: null,

  add(obj) {
    const dates =
      obj.content.value
        .match(/[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}/g)
        ?.join(", ") || "";

    if (this.currentTR) {
      const cells = Array.from(this.currentTR.getElementsByTagName("td"));
      cells[1].textContent = obj.action.value;
      cells[3].textContent = obj.category.value;
      cells[4].textContent = obj.content.value;
      cells[5].textContent = dates;
      this.currentTR = null;
    } else {
      const date = JSON.stringify(new Date().toLocaleString()).replaceAll(
        '"',
        ""
      );
      todoItems.insertAdjacentHTML(
        "beforeend",
        `
				<tr>
					<td><img class='pict' src=${svgPath}${obj.category.value}.svg></td>
					<td>${obj.action.value}</td>
					<td>${date}</td>
					<td>${obj.category.value}</td>
					<td>${obj.content.value}</td>
					<td>${dates}</td>
					<td><img class='pict' src='${svgPath}edit.svg'></td>
					<td><img class='pict' src='${svgPath}archive.svg'></td>
					<td><img class='pict' src='${svgPath}trash.svg'></td>
				</tr>`
      );
    }
    this.save();
  },

  init() {
    let tmp = localStorage.getItem("todoHomework1");
    if (tmp.trim()) todoItems.innerHTML = tmp;
    else {
      todoItems.innerHTML = initData;
      return;
    }

    tmp = localStorage.getItem("categoriesHomework1");
    if (tmp) itemsByCategories.innerHTML = tmp;
    tmp = localStorage.getItem("archiveHomework1");
    if (tmp) archivedItems.innerHTML = tmp;
  },

  save() {
    notesByCategory();
    localStorage.setItem("todoHomework1", todoItems.innerHTML);
    localStorage.setItem("categoriesHomework1", itemsByCategories.innerHTML);
    localStorage.setItem("archiveHomework1", archivedItems.innerHTML);
  },
};

todo.init();
