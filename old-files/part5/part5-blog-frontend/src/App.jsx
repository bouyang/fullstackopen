import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

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
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    // const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    // const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
        
      </div>
    )
  }
  // }
  //   return(
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //         <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //         <input
  //         type="password"
  //         value={password}
  //         name="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type="submit">login</button>
  //   </form>      
  // )}

  // const blogForm = () => {
  //   return(
  //     <div>
  //     <h2>blogs</h2>
  //     {blogs.map(blog => {
  //         return <Blog key={blog.id} blog={blog} />
  //       }
  //     )}

  //     <button onClick={logout}>logout</button>

  //     {/* <form onSubmit={addBlog}>
  //       <div>
  //         title: <input
  //           value={newTitle}
  //           onChange={handleTitleChange}
  //         />
  //       </div>
  //       <div>
  //         author: <input
  //           value={newAuthor}
  //           onChange={handleAuthorChange}
  //         />
  //       </div>
  //       <div>
  //         url: <input
  //           value={newUrl}
  //           onChange={handleUrlChange}
  //         />
  //       </div>
  //       <button type="submit">create</button>
  //     </form> */}

  //     <Togglable buttonLabel="new blog">
  //       <BlogForm
  //         onSubmit={addBlog}
  //         handleTitleChange={handleTitleChange}
  //         handleAuthorChange={handleAuthorChange}
  //         handleUrlChange={handleUrlChange}
  //         setNewTitle={setNewTitle}
  //         setNewAuthor={setNewAuthor}
  //         setNewUrl={setNewUrl}
  //       />
  //     </Togglable>
  //   </div>
  // )}

  const logout = () => {
    window.localStorage.clear();
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
        .create(blogObject)
        .then(response => {
          setBlogs(blogs.concat(response));
        })
  }

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <div>
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>

      <h2>blogs</h2>
      {blogs.map(blog => {
          return <Blog key={blog.id} blog={blog}
          increaseLikes={() => increaseLikes(blog.id)}
          delBlog={() => delBlog(blog.id)}/>
        }
      )}
      </div>
    )
  }

  const increaseLikes = (id) => {
    let blog = blogs.find(blog => blog.id === id)
    let changedBlog = { ...blog, likes: likes + 1 };

    blogService
      .update(id, changedBlog).then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
    
    // let blogId = blog.id;
    // let newObj = {
    //   user: blog.user,
    //   likes: blog.likes + 1,
    //   author: blog.author,
    //   title: blog.title,
    //   url: blog.url,
    // }
    // console.log(blogId);
    // console.log(newObj);
    // blogService.update(blogId, newObj);
  }

  const delBlog = (id) => {
    blogService.deleteBlog(id);
    // blogService.deleteBlog(id).then(blogs =>
    //   setBlogs( blogs )
    // );
  }

  // const addBlog = (event) => {
  //   event.preventDefault();
    
  //   // let userId = user['id'];
  //     let blogObject = {
  //       title: newTitle,
  //       author: newAuthor,
  //       url: newUrl,
  //       likes: 0,
  //       // user: userId,
  //       }

  //     blogService
  //       .create(blogObject)
  //       .then(response => {
  //         setBlogs(blogs.concat(response));
  //         setNewTitle('');
  //         setNewAuthor('');
  //         setNewUrl('');
  //         setErrorMessage(`added a new blog ${response.title} by ${response.author}`)
  //       })
  // }

  // const handleTitleChange = (event) => {
  //   setNewTitle(event.target.value);
  // }

  // const handleAuthorChange = (event) => {
  //   setNewAuthor(event.target.value);
  // }

  // const handleUrlChange = (event) => {
  //   setNewUrl(event.target.value);
  // }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={logout}>logout</button>
        {blogForm()}
      </div>
    }
    </div>
  )
}

export default App