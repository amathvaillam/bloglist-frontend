import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import TogglableBlog from './TogglableBlog'
import Blog from './Blog'

describe( '<Blog>',() => {
    let component
    const blog = {
        url: 'www.uuuu.com',
        title: 'the u blog',
        author: 'john u',
        likes: 10
    }
    beforeEach( () => {
        component = render(
            <TogglableBlog blog={ blog }>
                <Blog blog={ blog }></Blog>
            </TogglableBlog>
        )
    } )

    test( 'renders content',() => {
        component.debug()
        const resume = component.container.querySelector( '.resume' )
        const togglableContent = component.container.querySelector( '.togglableContent' )
        const author = component.container.querySelector( '.author' )
        const likes = component.container.querySelector( '.likes' )

        expect( resume ).toHaveTextContent(
            `${ blog.title } ${ blog.author }`
        )
        expect( togglableContent ).toHaveStyle( 'display: none' )
    } )
} )