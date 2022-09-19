const [popupBackground, popup, closePopupButton] =
	['.popup__bg', '.popup', '.close-popup']
		.map(e => document.querySelector(e)),
	// Correspondence of elements of the todoItems table to elements of the archivedItems table by creation time
	time2Item = new Map(),

hidePopup = () =>
	[popupBackground, popup].forEach(e => e.classList.remove('active')),

initPopup = tr => {
	const arr = Array.from(tr.getElementsByTagName('td')).map(e => e.textContent)
	todo.currentTR = tr
	popupBackground.classList.add('active')
	popup.classList.add('active')
	popup[0].value = arr[1] // action
	popup[1].value = arr[3] // category
	popup[2].value = arr[4] // content
}

createNote.addEventListener('click', e => {
	e.preventDefault()
	popupBackground.classList.add('active')
	popup.classList.add('active')
})

btnArchivedNotes.addEventListener('click', e => {
	ArchivedNotes.hidden = !ArchivedNotes.hidden
	btnArchivedNotes.innerText = ArchivedNotes.hidden ? "Archive":
		(redrawArchive(), "Hide the archive")
})

closePopupButton.addEventListener('click',
	() => hidePopup()
)
document.addEventListener('click',
	e => e.target === popupBackground && hidePopup()
)

const initData = `
<tr>
	<td><img class="pict" src="./img/Task.svg"></td>
	<td>Random Thought1</td>
	<td>19.09.2022, 14:54:31</td>
	<td>RandomThought</td>
	<td>The sun is shining bright</td>
	<td></td>
	<td><img class="pict" src="./img/edit.svg"></td>
	<td><img class="pict" src="./img/archive.svg"></td>
	<td><img class="pict" src="./img/trash.svg"></td>
</tr>
<tr>
	<td><img class="pict" src="./img/Task.svg"></td>
	<td>Task1</td>
	<td>19.09.2022, 14:57:22</td>
	<td>Task</td>
	<td>Complete task 1</td>
	<td></td>
	<td><img class="pict" src="./img/edit.svg"></td>
	<td><img class="pict" src="./img/archive.svg"></td>
	<td><img class="pict" src="./img/trash.svg"></td>
</tr>
<tr>
	<td><img class="pict" src="./img/Idea.svg"></td>
	<td>Idea1</td>
	<td>19.09.2022, 14:57:57</td>
	<td>Idea</td>
	<td>It's idea 1</td>
	<td></td>
	<td><img class="pict" src="./img/edit.svg"></td>
	<td><img class="pict" src="./img/archive.svg"></td>
	<td><img class="pict" src="./img/trash.svg"></td>
</tr>
<tr>
	<td><img class="pict" src="./img/Quote.svg"></td>
	<td>Quote1</td>
	<td>19.09.2022, 14:59:57</td>
	<td>Quote</td>
	<td>All's fair in love and war</td>
	<td></td>
	<td><img class="pict" src="./img/edit.svg"></td>
	<td><img class="pict" src="./img/archive.svg"></td>
	<td><img class="pict" src="./img/trash.svg"></td>
</tr>
<tr>
	<td><img class="pict" src="./img/Task.svg"></td>
	<td>Task2</td>
	<td>19.09.2022, 15:01:44</td>
	<td>Task</td>
	<td>Go to the dentist 09/21/2022 or 09/23/2022</td>
	<td>09/21/2022, 09/23/2022</td>
	<td><img class="pict" src="./img/edit.svg"></td>
	<td><img class="pict" src="./img/archive.svg"></td>
	<td><img class="pict" src="./img/trash.svg"></td>
</tr>
<tr>
	<td><img class="pict" src="./img/Task.svg"></td>
	<td>Task3</td>
	<td>19.09.2022, 15:03:10</td>
	<td>Task</td>
	<td>Рet the Cat</td>
	<td></td>
	<td><img class="pict" src="./img/edit.svg"></td>
	<td><img class="pict" src="./img/archive.svg"></td>
	<td><img class="pict" src="./img/trash.svg"></td>
</tr>
<tr>
	<td><img class="pict" src="./img/Task.svg"></td>
	<td>Task4</td>
	<td>19.09.2022, 15:03:45</td>
	<td>Task</td>
	<td>Feed the black Cat</td>
	<td></td>
	<td><img class="pict" src="./img/edit.svg"></td>
	<td><img class="pict" src="./img/archive.svg"></td>
	<td><img class="pict" src="./img/trash.svg"></td>
</tr>`