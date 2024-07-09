const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// const initialBlogs = [
//   {
//     title: 'ABC',
//     author: '123',
//     url: 'google.com',
//     likes: 1,
//   },
//   {
//     title: 'DEF',
//     author: '098',
//     url: 'facebook.com',
//     likes: 12,
//   }
// ]

beforeEach(async() => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

   assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the first blog is about A', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(e => e.title)
  assert.strictEqual(title.includes('ABCDEFGH'), true)
})

after(async () => {
  await mongoose.connection.close()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'true',
    url: 'www.abc.com',
    likes: 30,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(r => r.title)

  // assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(contents.includes('async/await simplifies making async calls'))
})

test('blogs have a unique id property', async () => {
  let response = await api.get('/api/blogs');
  let contents = response.body.filter(blog => blog.id)

  assert.strictEqual(contents.length, response.body.length);
})

test('blogs can be deleted', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'true',
    url: 'www.abc.com',
    likes: 30,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  const newBlogId = response.body.filter(blog => blog.author === 'true')[0].id;

  await api
    .delete(`/api/blogs/${newBlogId}`)
    .expect(201);

  const response2 = await api.get('/api/blogs')

  // assert.strictEqual(response2.body, response.body.length - 1)
})