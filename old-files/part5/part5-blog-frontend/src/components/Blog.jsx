import { useState, forwardRef, useImperativeHandle } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, increaseLikes, delBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
  <div style={blogStyle}>
      Title: {blog.title}
      <div><button onClick={delBlog}>delete</button></div>
    <div style={hideWhenVisible}>
      <button onClick={toggleVisibility}>show</button>
    </div>
    <div style={showWhenVisible}>
      <button onClick={toggleVisibility}>hide</button>
    </div>
    <div style={showWhenVisible}>
      Author: {blog.author}
    </div>
    <div style={showWhenVisible}>
      URL: {blog.url}
    </div>
    <div style={showWhenVisible}>
      Likes: {blog.likes}
      <button onClick={increaseLikes}>like</button>
    </div>
  </div>  
)
}

export default Blog