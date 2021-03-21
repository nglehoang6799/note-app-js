let notes = getSavedNotes()

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        atCreate: timestamp,
        atUpdate: timestamp
    })
    // localStorage.setItem('notes', JSON.stringify(notes))
    saveNotes(notes)
    renderNotes(notes, filters)
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#remove-all').addEventListener('click', () => {
    console.log('Remove all notes')
    document.querySelectorAll('.note').forEach((note) => {
        note.remove()
    })
})

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    console.log(e.target.value)
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})


// =================================================================================
// -- Working with forms --
//----------------------------------------------------------------------------------
// document.querySelector('#name-form').addEventListener('submit', function(e) {
//     e.preventDefault()
//     console.log(e.target.elements.fisrtName.value)
//     e.target.elements.fisrtName.value = ''
// })


// =================================================================================
// -- Checkbox --
// ---------------------------------------------------------------------------------
// document.querySelector('#for-fun').addEventListener('change', (e) => {
//     console.log(e.target.checked)
// })


// =================================================================================
// -- Dropdown --
// -------------------------------------------------------------------------------- 
document.querySelector('#filter-by').addEventListener('change', (e) => {
    // console.log(e.target.value)
    filters.sortBy = e.target.value
    notes = sortNotes(filters)
    console.log(notes)
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        // 1. Parse the new data and update notes
        // 2. Rerender the notes
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

// const now = moment()
// now.add(1, 'week').subtract(20, 'days')
// console.log(now.toString())
// console.log(now.format('MMMM Do, YYYY'))
// console.log(now.fromNow())

// const nowTimestamp = now.valueOf()
// console.log(moment(nowTimestamp).toString())

// now.minute(1)
// console.log(now.minute())

const myDate = moment()
myDate.year(1999).month(6).day(13).subtract(11, 'days')
console.log(myDate.format('MMM DD, YYYY'))