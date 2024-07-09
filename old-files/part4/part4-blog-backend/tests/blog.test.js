const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  const listWithBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful0',
      author: 'Edsger W. Dijkstra0',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf0',
      likes: 50,
      __v: 0
    }
  ]

  test('favorite blog test', () => {
    const result = listHelper.favoriteBlog(listWithBlogs)
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful0',
      author: 'Edsger W. Dijkstra0',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf0',
      likes: 50,
      __v: 0
    })
  })
})