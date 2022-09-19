const categoryes = ['Idea', 'Quote', 'RandomThought', 'Task'],
	itemsByCategories = document.getElementById('itemsByCategories'),
	todoItems = document.getElementById('todoItems'),
	svgPath = './img/',

notesByCategory = () => {

	const activeNotes = new Map(),
		archivedNotes = new Map()

	Array.from(todoItems.getElementsByTagName('tr')).forEach(e => {
		const category = e.childNodes[7].textContent
		if (categoryes.includes(category)) {
			if (e.hidden)
				archivedNotes[category] = ++archivedNotes[category] || 1
			else
				activeNotes[category] = ++activeNotes[category] || 1
		}
	})

	itemsByCategories.innerHTML = categoryes.map(category => archivedNotes[category] || activeNotes[category] ?
		`<tr>
			<td><img class='pict' src=${svgPath}${category}.svg></td>
			<td>${category}</td>
			<td>${activeNotes[category] || 0}</td>
			<td>${archivedNotes[category] || 0}</td>
		</tr>` : ''
	).join('')
},

redrawArchive = () => {
	archivedItems.innerHTML = Array.from(todoItems.getElementsByTagName('tr'))
		.filter(e => e.hidden)
		.map((e, i) => {
			time2Item[e.childNodes[5].textContent] = e
			return `<tr>${e.innerHTML}</tr>`
		})
		.join('')
		.replaceAll('archive', 'unarchive')
},

todo = {
	currentTR: null,

	add(obj) {
		const dates = obj.content.value.match(/[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}/g)?.join(', ') || ''

		if (this.currentTR) {
			const cells = Array.from(this.currentTR.getElementsByTagName('td'))
			cells[1].textContent = obj.action.value
			cells[3].textContent = obj.category.value
			cells[4].textContent = obj.content.value
			cells[5].textContent = dates
			this.currentTR = null
		} else {
			const date = JSON.stringify(new Date().toLocaleString()).replaceAll('"', '')
			todoItems.insertAdjacentHTML('beforeend', `
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
				</tr>`)
		}
		this.save()
	},

	init() {
		let tmp = localStorage.getItem('todoHomework1')
		if (tmp.trim())
			todoItems.innerHTML = tmp
		else {
			todoItems.innerHTML = initData
			return
		}
		
		
		tmp = localStorage.getItem('categoriesHomework1')
		if (tmp) itemsByCategories.innerHTML = tmp
		tmp = localStorage.getItem('archiveHomework1')
		if (tmp) archivedItems.innerHTML = tmp
		//localStorage.setItem('todoHomework1', '')
		//localStorage.setItem('categoriesHomework1', '')
	},

	save() {
		notesByCategory()
		localStorage.setItem('todoHomework1', todoItems.innerHTML)
		localStorage.setItem('categoriesHomework1', itemsByCategories.innerHTML)
		localStorage.setItem('archiveHomework1', archivedItems.innerHTML)
	}
}

todo.init()

todoItems.onclick = event => {

	const td = event.target.closest('td')
	if (!td) return

	const img = td.getElementsByTagName('img')[0]
	if (!img) return

	if (img.src.includes('trash')) {
		td.parentNode.remove()
		todo.save()
	} else if (img.src.includes('archive')) {
		td.parentNode.hidden = true
		todo.save()
		redrawArchive()
	} else if (img.src.includes('edit'))
		initPopup(td.parentNode)
}

archivedItems.onclick = event => {

	const td = event.target.closest('td')
	if (!td) return

	const img = td.getElementsByTagName('img')[0]
	if (!img) return

	const rowFromTodoTable = time2Item[event.target.closest('tr').childNodes[5].textContent]
	if (img.src.includes('trash')) {
		td.parentNode.remove()
		rowFromTodoTable.remove()
		todo.save()
	} else if (img.src.includes('unarchive')) {
		td.parentNode.remove()
		rowFromTodoTable.hidden = false
		todo.save()
	} else if (img.src.includes('edit'))
		initPopup(rowFromTodoTable)
}