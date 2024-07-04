import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import numbersService from './services/numbers'

const Person = ({ info, deleteInfo }) => {
  return <li>
    {info.name} {info.number}
    <p>
      <button onClick={deleteInfo}>delete info</button>
    </p>
  </li>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilter] = useState('')


  useEffect(() => {
    numbersService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addInfo = (event) => {
    event.preventDefault();
    if (persons.filter(element => {
      return element.name === newName;
    }).length === 0) {
      let personObject = {
        name: newName,
        number: newNumber,
        }

      numbersService
        .addInfo(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        })
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const deleteInfo = (id) => {
    if (confirm('are you sure')) {
      let newList = persons.filter(item => item['id'] !== id);
      numbersService
        .deleteInfo(id)
        .then(response => {
          setPersons(newList);
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const personsFiltered = persons.filter(element => {
    const regex = new RegExp(filterName, 'gi');
    return regex.test(element.name);
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <form onSubmit={addInfo}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {personsFiltered.map(info =>
            <Person key={info.name} info={info} deleteInfo={() => deleteInfo(info.id)}/>
          )}
        </ul>
    </div>
  )
}

export default App