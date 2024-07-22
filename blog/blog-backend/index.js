// const express = require('express')
// const morgan = require('morgan')
// const cors = require('cors')

// const Blog = require('./models/blog')

// const app = express()

// app.use(express.json())
// app.use(morgan('tiny'))
// app.use(cors())
// app.use(express.static('dist'))

// const requestLogger = (request, response, next) => {
//   console.log('---')
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)

// app.get('/api/blogs', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })

// // app.get('/', (request, response) => {
// //   response.send('<h1>Hello World!</h1>')
// // })

// // app.get('/info', (request, response) => {
// //   let date = new Date();

// //   const html = (`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)

// //   response.send(html);
// // })

// // app.get('/api/persons', (request, response) => {
// //   Person.find({}).then(persons => {
// //     response.json(persons);
// //   })
// // })

// // app.get('/api/persons/:id', (request, response, next) => {
// //   Person.findById(request.params.id)
// //     .then(person => {
// //       if(person) {
// //         response.json(person);
// //       } else {
// //         response.status(404).end()
// //       }
// //     })
// //     .catch(error => next(error))
// // })

// // app.delete('/api/persons/:id', (request, response) => {
// //   Person.findByIdAndDelete(request.params.id)
// //     .then(result => {
// //       response.status(204).end()
// //     })
// //     .catch(error => next(error))
// // })

// // app.post('/api/persons', (request, response, next) => {
// //   const body = request.body;

// //   // if (!body.name) {
// //   //   return response.status(400).json({ 
// //   //     error: 'must have name to create new entry in phonebook'
// //   //   })
// //   // }

// //   const person = new Person({
// //     name: body.name,
// //     number: body.number,
// //   })

// //   person.save()
// //     .then(savedPerson => {
// //       response.json(savedPerson)
// //     })
// //     .catch(error => next(error))
// // })

// // app.put('/api/persons/:id', (request, response, next) => {
// //   const { name, number } = request.body;

// //   Person.findByIdAndUpdate(
// //     request.params.id,
// //     { name, number },
// //     { new: true, runValidators: true, context: 'query' }
// //   )
// //     .then(updatedPerson => {
// //       response.json(updatedPerson)
// //     })
// //     .catch(error => next(error))
// // })

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'hello request made to unknown route: unknown endpoint' })
// }

// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

// // this has to be the last loaded middleware, also all the routes should be registered before this!
// app.use(errorHandler)

// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })





const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})