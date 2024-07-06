const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach(blog => sum += blog.likes);
  return sum;
}

const favoriteBlog = (blogs) => {
  let top = blogs[0].likes;
  blogs.forEach(blog => {
    if (blog.likes > top) {
      top = blog;
    }
  });
  return top;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}