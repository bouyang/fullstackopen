import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
          <div>
            Title:
              <input
              value={blogTitle}
              onChange={event => setBlogTitle(event.target.value)}
              placeholder='write blog title here'
              id='blogTitleInput'
            />
          </div>
          <div>
            Author:
              <input
                value={blogAuthor}
                onChange={event => setBlogAuthor(event.target.value)}
                placeholder='write blog author here'
              />
          </div>
          <div>
            Url:
              <input
              value={blogUrl}
              onChange={event => setBlogUrl(event.target.value)}
              placeholder='write blog url here'
            />
          </div>
          
          <button type="submit">save</button>
        </form>
      </div>
  )
}
// const BlogForm = ({ onSubmit, blogTitle, handleTitleChange, blogAuthor, handleAuthorChange, blogUrl, handleUrlChange }) => {
//   return (
//     <form onSubmit={onSubmit}>
//       <div>
//         Title:
//           <input
//           value={blogTitle}
//           onChange={handleTitleChange}
//         />
//       </div>
//       <div>
//         Author:
//           <input
//             value={blogAuthor}
//             onChange={handleAuthorChange}
//           />
//       </div>
//       <div>
//         Url:
//           <input
//           value={blogUrl}
//           onChange={handleUrlChange}
//         />
//       </div>
      
//       <button type="submit">save</button>
//     </form>
//   )
// }

export default BlogForm