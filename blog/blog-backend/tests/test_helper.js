const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "testBlogTitle1",
    "author": "testBlogAuthor1",
    "url": "testUrl1",
    "likes": 1,
  },
  {
    "title": "testBlogTitle2",
    "author": "testBlogAuthor2",
    "url": "testUrl2",
    "likes": 2,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}