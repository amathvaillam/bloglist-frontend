import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => (
  <div>
    <div>{blog.url}</div>
    <div>likes {blog.likes}  <button>like</button></div>
    <div>{blog.author}</div>
  </div>
)

export default Blog
