import React, { useState } from 'react'

const TogglableBlog = (props) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'black',
            paddingTop: 10,
            marginBottom: 10 }}>
            <div >
                {props.blog.title}  <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
            </div>
            <div style={showWhenVisible}>{props.children}</div>
        </div>
    )
}
export default TogglableBlog