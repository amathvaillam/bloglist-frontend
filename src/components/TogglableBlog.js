import React,{ useState } from 'react'

const TogglableBlog = ( props ) => {
    const [ visible,setVisible ] = useState( false )

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible( !visible )
    }

    return (
        <div style={ {
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'black',
            paddingTop: 10,
            marginBottom: 10
        } }>
            <div className='resume'>
                { props.blog.title } { props.blog.author } <button onClick={ toggleVisibility }>{ visible ? 'hide' : 'show' }</button>
            </div>
            <div className='togglableContent' style={ showWhenVisible }>{ props.children }</div>
        </div>
    )
}
export default TogglableBlog