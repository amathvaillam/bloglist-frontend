import React,{ useState } from 'react'
const BlogForm = ( { createBlog } ) => {
    const [ title,setTitle ] = useState( '' )
    const [ author,setAuthor ] = useState( '' )
    const [ url,setUrl ] = useState( '' )


    const handleCreateBlog = ( event ) => {
        event.preventDefault()
        createBlog( {
            url,
            author,
            title
        } )
        setTitle( '' )
        setAuthor( '' )
        setUrl( '' )
    }
    return (
        <React.Fragment>
            <h2>create new</h2>
            <form onSubmit={ handleCreateBlog }>
                <div>
                    title:
                    <input
                        className="title"
                        type="text"
                        value={ title }
                        name="Title"
                        onChange={ ( { target } ) => setTitle( target.value ) }
                    />
                </div>
                <div>
                    author:
                    <input
                        className="author"
                        type="text"
                        value={ author }
                        name="Author"
                        onChange={ ( { target } ) => setAuthor( target.value ) }
                    />
                </div>
                <div>
                    url:
                    <input
                        className="url"
                        type="text"
                        value={ url }
                        name="Url"
                        onChange={ ( { target } ) => setUrl( target.value ) }
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </React.Fragment>
    )
}
export default BlogForm
