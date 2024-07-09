import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault();
    
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  }

    return (
      <form onSubmit={addBlog}>
       <div>
          title: <input
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
      </div>
      <div>
        author: <input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
        url: <input
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
    )
  }

// const BlogForm = ({ onSubmit, handleTitleChange,  handleAuthorChange,  handleUrlChange, newTitle, newAuthor, newUrl }) => {
//   return (
//     <form onSubmit={onSubmit}>
//       <div>
//         title: <input
//           value={newTitle}
//           onChange={handleTitleChange}
//         />
//       </div>
//       <div>
//         author: <input
//           value={newAuthor}
//           onChange={handleAuthorChange}
//         />
//       </div>
//       <div>
//         url: <input
//           value={newUrl}
//           onChange={handleUrlChange}
//         />
//       </div>
//       <button type="submit">create</button>
//     </form>
//   )
// }

export default BlogForm