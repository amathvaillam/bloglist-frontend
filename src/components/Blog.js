import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, update, remove }) => {

    const [likes, setLikes] = useState(blog.likes)
    return (
        <div>
            <div>{blog.url}</div>
            <div>likes {likes}  <button onClick={() => {
                setLikes(likes + 1)
                update({ ...blog, likes })
            }}>like</button></div>
            <div>{blog.author}</div>
            <div><button style={{ backgroundColor: 'blue' }} onClick={() => {
                remove(blog)
            }}>remove</button>
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
