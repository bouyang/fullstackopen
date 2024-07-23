import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const [blogTitle, setBlogTitle] = useState('')
  // const [blogAuthor, setBlogAuthor] = useState('')
  // const [blogUrl, setBlogUrl] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setErrorMessage('Logged in successfully')
      setErrorNotification(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setErrorNotification(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  // const handleTitleChange = (event) => {
  //   setBlogTitle(event.target.value);
  // }

  // const handleAuthorChange = (event) => {
  //   setBlogAuthor(event.target.value);
  // }

  // const handleUrlChange = (event) => {
  //   setBlogUrl(event.target.value);
  // }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    
    let returnedBlog = await blogService.create(blogObject);

    setBlogs(blogs.concat(returnedBlog))
    // setBlogTitle('')
    // setBlogAuthor('')
    // setBlogUrl('')

    setErrorNotification(false);
    setErrorMessage(
      `${blogObject.title} added`
    )

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // const addBlog = async (event) => {
  //   event.preventDefault();

  //   const blogObject = {
  //     title: blogTitle,
  //     author: blogAuthor,
  //     url: blogUrl,
  //   }

  //   let returnedBlog = await blogService.create(blogObject);

  //   setBlogs(blogs.concat(returnedBlog))
  //   setBlogTitle('')
  //   setBlogAuthor('')
  //   setBlogUrl('')

  //   setErrorNotification(false);
  //   setErrorMessage(
  //     `${blogTitle} added`
  //   )

  //   setTimeout(() => {
  //     setErrorMessage(null)
  //   }, 5000)
  // }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
        // onSubmit={addBlog}
        // blogTitle={blogTitle}
        // handleTitleChange={handleTitleChange}
        // blogAuthor={blogAuthor}
        // handleAuthorChange={handleAuthorChange}
        // blogUrl={blogUrl}
        // handleUrlChange={handleUrlChange}
      />
    </Togglable>
  )

  const logoutForm = () => {
    return (
      <button onClick={handleLogout}>logout</button>
    )
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const deleteBlog = async (id) => {
    await blogService.deleteBlogFromService(id)

    let allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} error={errorNotification} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in {logoutForm()}</p>
          <h2>Create new</h2>
          {blogForm()}
          
          <h2>List of blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog}/>
          )}
          
        </div>
      }
    </div>
  )
}

export default App