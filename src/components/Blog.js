import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, update, remove }) => {

  const [likes, setLikes] = useState(blog.likes)
  const [url, setUrl] = useState(blog.url)
  const [author, setAuthor] = useState(blog.author)
  const [id, setId] = useState(blog.id)
  return (
    <div>
      <div>{url}</div>
      <div>likes {likes}  <button onClick={() => {
        setLikes(likes + 1)
        update({ ...blog, likes })
      }}>like</button></div>
      <div>{author}</div>
      <div><button style={{ backgroundColor: 'blue' }} onClick={() => {
        remove(blog)
      }}>remove</button>
      </div>
    </div>
  )
}

export default Blog
