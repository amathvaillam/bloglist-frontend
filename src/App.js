import React,{ useState,useEffect,useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


import './App.css'
import TogglableBlog from './components/TogglableBlog'

const App = () => {

    const [ blogs,setBlogs ] = useState( [] )
    const [ errorMessage,setErrorMessage ] = useState( null )
    const [ successMessage,setSuccessMessage ] = useState( '' )

    const [ username,setUsername ] = useState( '' )
    const [ password,setPassword ] = useState( '' )

    const [ user,setUser ] = useState( null )

    const blogRef = useRef()

    useEffect( () => {
        blogService.getAll().then( blogs =>
            setBlogs( blogs )
        )
    },[] )

    useEffect( () => {
        const loggedUserJSON = window.localStorage.getItem( 'loggedBlogappUser' )
        if ( loggedUserJSON )
        {
            const user = JSON.parse( loggedUserJSON )
            setUser( user )
            blogService.setToken( user.token )
        }
    },[] )

    const handleLogin = async ( event ) => {
        event.preventDefault()
        try
        {
            const user = await loginService.login( {
                username,password,
            } )
            // tokens
            window.localStorage.setItem(
                'loggedBlogappUser',JSON.stringify( user )
            )
            blogService.setToken( user.token )
            //tokens
            setUser( user )
            setUsername( '' )
            setPassword( '' )
        } catch ( exception )
        {
            setErrorMessage( 'Wrong username or password' )

            setTimeout( () => {
                setErrorMessage( null )
            },5000 )
        }
    }

    const createBlog = async ( { title,author,url } ) => {
        try
        {
            blogRef.current.toggleVisibility()
            const newBlog = await blogService.create( {
                title,author,url
            } )
            if ( newBlog.user )
            {
                const blogs = await blogService.getAll()
                setBlogs( blogs )
                setSuccessMessage( `a new blog ${ newBlog.title } by ${ newBlog.author } added` )
                setTimeout( () => {
                    setSuccessMessage( null )
                },5000 )
            }

        } catch ( exception )
        {

            setErrorMessage( exception.response.data.error )
            setTimeout( () => {
                setErrorMessage( null )
            },5000 )
        }
    }

    const update = async ( blog ) => {
        try
        {
            const updatedBlog = await blogService.update( blog )
            if ( updatedBlog.id )
            {
                const blogs = await blogService.getAll()
                setBlogs( blogs )
                setSuccessMessage( `the blog ${ updatedBlog.title } by ${ updatedBlog.author } updated` )
                setTimeout( () => {
                    setSuccessMessage( null )
                },5000 )
            }

        } catch ( exception )
        {

            setErrorMessage( exception.response.data.error )
            setTimeout( () => {
                setErrorMessage( null )
            },5000 )
        }
    }

    const remove = async ( blog ) => {
        try
        {
            if ( window.confirm( `remove blog ${ blog.title } by ${ blog.author }` ) )
            {
                await blogService.remove( blog.id )
                const blogs = await blogService.getAll()
                setBlogs( blogs )
                setSuccessMessage( `the blog ${ blog.title } by ${ blog.author } removed` )
                setTimeout( () => {
                    setSuccessMessage( null )
                },5000 )
            }

        } catch ( exception )
        {

            setErrorMessage( exception.response.data.error )
            setTimeout( () => {
                setErrorMessage( null )
            },5000 )
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
        setUser( null )
    }
    const Notification = ( { message,classname } ) => message === null
        ? null
        : ( <div className={ classname }>{ message }</div> )

    const SuccessNotification = ( { successMessage,classname = 'success' } ) =>
        <Notification message={ successMessage } classname={ classname }></Notification>
    const ErrorNotification = ( { errorMessage,classname = 'fail' } ) =>
        <Notification message={ errorMessage } classname={ classname }></Notification>



    if ( user === null )
        return (
            <div>
                <h2>log in to application</h2>
                { successMessage && <SuccessNotification successMessage={ successMessage }></SuccessNotification> }
                { errorMessage && <ErrorNotification errorMessage={ errorMessage }></ErrorNotification> }
                <form onSubmit={ handleLogin }>
                    <div>
                        username
                        <input
                            type="text"
                            value={ username }
                            id="username"
                            name="Username"
                            onChange={ ( { target } ) => setUsername( target.value ) }
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={ password }
                            id="password"
                            name="Password"
                            onChange={ ( { target } ) => setPassword( target.value ) }
                        />
                    </div>
                    <button type="submit" id="login-button">login</button>
                </form>
            </div>
        )
    return (
        <div>
            <h2>blogs</h2>
            <div><p>{ user.name } is logged-in<button onClick={ () => { handleLogout() } }>logout</button></p></div>
            { successMessage && <SuccessNotification successMessage={ successMessage }></SuccessNotification> }
            { errorMessage && <ErrorNotification errorMessage={ errorMessage }></ErrorNotification> }
            <Togglable ref={ blogRef }>
                <BlogForm
                    createBlog={ createBlog }>
                </BlogForm>
            </Togglable>
            { blogs.sort( ( a,b ) => b.likes - a.likes ).map( blog =>
                <TogglableBlog blog={ blog } key={ blog.id }>
                    <Blog blog={ blog } update={ update } remove={ remove }></Blog>
                </TogglableBlog>
            ) }
        </div>
    )
}

export default App