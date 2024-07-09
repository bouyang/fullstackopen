const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'ABCDEFGH',
      author: '123',
      url: 'google.com',
      likes: 1,
    },
    {
      title: 'DEFGHIJKL',
      author: '098',
      url: 'facebook.com',
      likes: 12,
    }
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
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