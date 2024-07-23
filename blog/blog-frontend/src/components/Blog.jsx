import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog }) => {
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

  const addLike = () => {
    const id = blog.id

    // const allBlogs = await blogService.getAll()

    // const currentBlog = allBlogs.find(b => b.id === id)

    const blogObject = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }

    blogService.update(id, blogObject);
  }

  const deleteSpecificBlog = () => {
    const id = blog.id
    deleteBlog(id);
  }

  return (
    <div>
      <div style={{...hideWhenVisible, ...blogStyle}} className='blog'>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={{...showWhenVisible, ...blogStyle}}>
        {blog.title} by {blog.author}<br/>
        Likes: {blog.likes} <button onClick={addLike}>like</button><br/>
        {blog.url}<br/>
        <button onClick={deleteSpecificBlog}>delete</button><br/>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog