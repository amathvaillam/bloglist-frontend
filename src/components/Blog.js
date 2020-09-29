import React,{ useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ( { blog,update,remove } ) => {

    const [ likes,setLikes ] = useState( blog.likes )
    return (
        <div className="blog">
            <div className="url">{ blog.url }</div>
            <div className="likes">likes { likes }  <button className="likeButton" onClick={ () => {
                setLikes( likes + 1 )
                update( { ...blog,likes } )
            } }>like</button></div>
            <div className="author">{ blog.author }</div>
            <div><button style={ { backgroundColor: 'blue' } } onClick={ () => {
                remove( blog )
            } }>remove</button>
            </div>
        </div>
    )
}
Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
}

export default Blog
