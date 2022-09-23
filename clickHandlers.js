todoItems.onclick = (event) => {
  const td = event.target.closest("td");
  if (!td) return;

  const img = td.getElementsByTagName("img")[0];
  if (!img) return;

  if (img.src.includes("trash")) {
    td.parentNode.remove();
    todo.save();
  } else if (img.src.includes("archive")) {
    td.parentNode.hidden = true;
    todo.save();
    redrawArchive();
  } else if (img.src.includes("edit")) initPopup(td.parentNode);
};

archivedItems.onclick = (event) => {
  const td = event.target.closest("td");
  if (!td) return;

  const img = td.getElementsByTagName("img")[0];
  if (!img) return;

  const rowFromTodoTable =
    time2Item[event.target.closest("tr").childNodes[5].textContent];
  if (img.src.includes("trash")) {
    td.parentNode.remove();
    rowFromTodoTable.remove();
    todo.save();
  } else if (img.src.includes("unarchive")) {
    td.parentNode.remove();
    rowFromTodoTable.hidden = false;
    todo.save();
  } else if (img.src.includes("edit")) initPopup(rowFromTodoTable);
};
