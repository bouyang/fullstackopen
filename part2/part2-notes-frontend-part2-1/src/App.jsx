import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    const toggleImportanceOf = id => {
      const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          alert(
            `the note '${note.content}' was already deleted from server`
          )
          setNotes(notes.filter(n => n.id !== id))
        })
    }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
           />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App 


// import { useState } from 'react'
// import Filter from './components/Filter'

// const Person = ({ info }) => {
//   return <li>{info.name} {info.number}</li>
// }

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas', number: '040-123456', id: 1 },
//     { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
//     { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
//     { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
//   ])
//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState('')
//   const [filterName, setNewFilter] = useState('')


//   const addInfo = (event) => {
//     event.preventDefault();
//     if (persons.filter(element => {
//       return element.name === newName;
//     }).length === 0) {
//       setPersons(persons.concat({name: newName, number: newNumber, id: (persons.length + 1)}));
//       setNewName('');
//       setNewNumber('');
//     } else {
//       alert(`${newName} is already added to phonebook`);
//     }
//   }

//   const handleNameChange = (event) => {
//     setNewName(event.target.value);
//   }

//   const handleNumberChange = (event) => {
//     setNewNumber(event.target.value);
//   }

//   const handleFilterChange = (event) => {
//     setNewFilter(event.target.value);
//   }

//   const personsFiltered = persons.filter(element => {
//     const regex = new RegExp(filterName, 'gi');
//     return regex.test(element.name);
//   })

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
//       <h2>Add a new</h2>
//       <form onSubmit={addInfo}>
//         <div>
//           name: <input value={newName} onChange={handleNameChange} />
//         </div>
//         <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//         <ul>
//           {personsFiltered.map(info =>
//             <Person key={info.name} info={info} />
//           )}
//         </ul>
//     </div>
//   )
// }

// export default App