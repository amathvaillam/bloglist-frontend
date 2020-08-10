import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [classname, setClassname] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      // tokens
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      //tokens 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null)
  }
  const Notification = ({ message, classname }) => message === null
    ? null
    : (<div className={classname}>{message}</div>)

  const SuccessNotification = ({ successMessage, classname = 'success' }) =>
    <Notification message={successMessage} classname={classname}></Notification>
  const ErrorNotification = ({ errorMessage, classname = 'fail' }) =>
    <Notification message={errorMessage} classname={classname}></Notification>

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      if (newBlog.user) {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
        setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }

    } catch (exception) {

      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const BlogForm = () => {
    const hideWhenVisible = {display:blogFormVisible ? 'none' : ''}
    const showWhenVisible = {display:blogFormVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick = {() =>{setBlogFormVisible(true)}}>create new</button>
        </div>
        <div style={showWhenVisible}>
          <h2>create new</h2>
          <form onSubmit={handleCreate}>
            <div>
              title:
        <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
        <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
        <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
        <div style={showWhenVisible}>
          <button onClick = {() =>{setBlogFormVisible(false)}}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null)
    return (
      <div>
        <h2>log in to application</h2>
        {successMessage && <SuccessNotification successMessage={successMessage}></SuccessNotification>}
        {errorMessage && <ErrorNotification errorMessage={errorMessage}></ErrorNotification>}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  return (
    <div>
      <h2>blogs</h2>
      <div><p>{user.name} is logged-in<button onClick={() => { handleLogout() }}>logout</button></p></div>
      {successMessage && <SuccessNotification successMessage={successMessage}></SuccessNotification>}
      {errorMessage && <ErrorNotification errorMessage={errorMessage}></ErrorNotification>}
      <BlogForm></BlogForm>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App