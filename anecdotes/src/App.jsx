import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useMatch, useNavigate
} from 'react-router-dom'
import  { useField } from './hooks'
import { Table, Form, Button, Alert, Navbar } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='/' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
    return (
    <div>
      <h2>Anecdotes</h2>
      <Table striped>
        <tbody>
        {/* <ul> */}
        
          {anecdotes.map(anecdote =>
            <tr key={anecdote.id}>
              <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </td>
            </tr>
          )}
        {/* </ul> */}
        </tbody>
      </Table>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  const id = useParams().id
  // const anecdote = anecdotes.find(n => n.id === Number(id)) 
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div><br/>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div><br/>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = ({notification}) => {
  if (notification) {
    return (
      <Alert>
        {notification}
      </Alert>
    )
  }
}

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const navigate = useNavigate()

  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent();
    resetAuthor();
    resetInfo();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control
            {...content}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            {...author}
          /> 
        </Form.Group>
        <Form.Group>
          <Form.Label>url for more info</Form.Label>
          <Form.Control
            {...info}
          /> 
        </Form.Group>
        <Button variant='primary' type='submit'>create</Button>
        <Button onClick={handleReset}>reset</Button>
        {/* <button onClick={handleReset}>reset</button> */}
      </Form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`${anecdote.content} has been added`)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
    
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div className='container'>
    {/* <Router> */}
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />
        {/* <AnecdoteList anecdotes={anecdotes} />
        <About />
        <CreateNew addNew={addNew} /> */}
        
      </div>

      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
      </Routes>

      
    {/* </Router> */}

    <footer>
    <Footer />
    </footer>
    </div>
  )
}

export default App
