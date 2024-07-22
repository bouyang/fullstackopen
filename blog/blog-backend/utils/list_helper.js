const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  let result = 0;
  list.forEach(blog => result += blog.likes);
  return result;
}

const favoriteBlog = (list) => {
  let result = list[0];
  list.forEach(blog => {
    if (blog.likes > result.likes) {
      result = blog;
    }
  })
  return result;
}

const mostBlogs = (list) => {
  let authors = {}
  
  list.forEach(blog => {
    authors[blog.author] = authors[blog.author] || 0;
    authors[blog.author] += 1;
  })

  let max = 0;
  let maxAuthor = '';

  Object.entries(authors).forEach(author => {
    if (author[1] > max) {
      max = author[1];
      maxAuthor = author[0];
    }
  });

  return { author: maxAuthor, blogs: max }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}