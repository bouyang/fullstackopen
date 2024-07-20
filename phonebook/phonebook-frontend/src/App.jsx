import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const Persons = ({id, name, number, toggleNumber, deletePerson}) => {
  return (
    <li className='person' key={id}>
      {name}: {number}
      <button onClick={toggleNumber}>+1</button>
      <button onClick={deletePerson}>delete</button>
    </li>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <form>
      <div>
        Flter shown with: <input
                  value={newFilter}
                  onChange={handleFilterChange}/>
      </div>
    </form>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
                  value={newNumber}
                  onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Phonebook app</em>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  let filteredPersons = persons.filter(person => {
    return new RegExp(newFilter, 'ig').test(person.name)
  })

  // const hook = () => {
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       setPersons(response.data)
  //     })
  // }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  // useEffect(hook, [])

  const toggleNumber = (id) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: person.number + 1}

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        setErrorNotification(true);
        setErrorMessage(
          `Person ${person.name} was already removed`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
  }

  const addPerson = (event) => {
    event.preventDefault();
    let names = persons.map(person => person.name);

    if (names.includes(newName)) {
      let id = (persons.filter(person => person.name === newName))[0].id
      if (confirm('Update with new number?')) {
        updatePerson(id)
      } else {
        setErrorNotification(true);
        setErrorMessage(
          `${newName} already found`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setErrorNotification(false);
          setErrorMessage(
            `${newName} added`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const updatePerson = (id) => {
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setErrorNotification(false);
        setErrorMessage(
          `${newName} updated`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    personService
      .deleteItem(id)
      .then(returnedPerson => {
        setPersons(persons.filter(n => n.id !== id))
        setErrorNotification(false);
        setErrorMessage(
          `${persons.filter(n => n.id === id)[0].name} deleted`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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

  

  return (
    <div>
      <Notification message={errorMessage} error={errorNotification} />
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter}
                handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
        <PersonForm
            addPerson={addPerson}
            newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => {
          return (
            <Persons
              key={person.id}
              name={person.name}
              number={person.number}
              toggleNumber={() => toggleNumber(person.id)}
              deletePerson={() => deletePerson(person.id)}
              />
          )
        })}
      </ul>
      <Footer />
    </div>
  )
}

export default App