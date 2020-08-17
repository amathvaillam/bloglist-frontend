import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import TogglableBlog from './TogglableBlog'
import Blog from './Blog'

describe( '<Blog>',() => {
    let component
    const mockHandler = jest.fn()
    const blog = {
        url: 'www.uuuu.com',
        title: 'the u blog',
        author: 'john u',
        likes: 10
    }
    beforeEach( () => {
        component = render(
            <TogglableBlog blog={ blog }>
                <Blog blog={ blog } update={ mockHandler }></Blog>
            </TogglableBlog>
        )
    } )

    test( 'renders content',() => {

        const resume = component.container.querySelector( '.resume' )
        const togglableContent = component.container.querySelector( '.togglableContent' )

        expect( resume ).toHaveTextContent(
            `${ blog.title } ${ blog.author }`
        )
        expect( togglableContent ).toHaveStyle( 'display: none' )
    } )

    test( 'clicking the button shown',() => {

        const togglableContent = component.container.querySelector( '.togglableContent' )
        const button = component.container.querySelector( '.shown' )

        fireEvent.click( button )
        expect( togglableContent ).not.toHaveStyle( 'display: none' )
    } )

    test( 'clicking the like button twice',() => {

        const button = component.container.querySelector( '.likeButton' )
        fireEvent.click( button )
        fireEvent.click( button )
        expect( mockHandler.mock.calls ).toHaveLength( 2 )
    } )
} )