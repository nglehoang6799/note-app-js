// 'use strict'

// const processData = () => {
//     data = '123'
// }

// processData()
// console.log(data)

// Read exsisting notes from localStorage
const getSavedNotes = () => {
    // Check for exsisting saved data
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

// Remove a note from list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDom = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // setup the remove note button
    // button.textContent = 'x'
    // noteEl.appendChild(button)
    // button.addEventListener('click', () => {
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })

    // setup the note title text
    textEl.textContent = note.title.length > 0 ? note.title : 'Unnamed note'
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // setup the status
    statusEl.textContent = generateLastEdited(note.atUpdate)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    
    return noteEl
} 

// Sort your notes by one of three way
const sortNotes = (filters) => {
    if (filters.sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.atUpdate > b.atUpdate) {
                return -1
            } else if (a.atUpdate < b.atUpdate){
                return 1
            } else {
                return 0
            }
        }) 
    } else if (filters.sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.atCreate > b.atCreate){
                return -1
            } else if (a.atCreate < b.atCreate) {
                return 1
            } else {
                return 0
            }
        })
    } else if(filters.sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Render application notes
const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#render-note').innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDom(note)
            document.querySelector('#render-note').appendChild(noteEl)
        })
    } else {
        const emptMessage = document.createElement('p')
        emptMessage.textContent = 'No notes to show'
        emptMessage.classList.add('empty-message')
        document.querySelector('#render-note').appendChild(emptMessage)
    }

    
    
}

// Save the note to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`