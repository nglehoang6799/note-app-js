const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.atUpdate)

// 1. Setup input event for title
// 2. Update note object and save notes list
// 3. Repeat steps 1, 2 for body
// 4. Setup a remove button that remotes notes and sends uses back to home page

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.atUpdate = moment().valueOf()
    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.atUpdate = moment().valueOf()
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
        
        if (!note) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.atUpdate)
    }
})