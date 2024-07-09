const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://brianouyang17:jHHNOeH7tTH2mG9I@cluster0.udt9pvf.mongodb.net/?retryWrites=true&w=majority&appName=blogsApp`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)

  /*
  const note = new Note({
    content: 'HTML is x',
    important: true,
  })

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
})
