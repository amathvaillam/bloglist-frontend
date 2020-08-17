import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe( '<BlogForm>',() => {
    let component
    const createBlog = jest.fn()

    beforeEach( () => {
        component = render(
            <BlogForm createBlog={ createBlog }></BlogForm>
        )
    } )

    test( 'blogform',() => {

        const form = component.container.querySelector( 'form' )
        const url = component.container.querySelector( '.url' )
        const author = component.container.querySelector( '.author' )
        const title = component.container.querySelector( '.title' )

        fireEvent.change( url,{
            target: { value: 'www.google.com' }
        } )
        fireEvent.change( author,{
            target: { value: 'moussa' }
        } )
        fireEvent.change( title,{
            target: { value: 'moss def' }
        } )
        fireEvent.submit( form )

        expect( createBlog.mock.calls ).toHaveLength( 1 )
        console.log( createBlog.mock.calls[ 0 ][ 0 ] )

        expect( createBlog.mock.calls[ 0 ][ 0 ].url ).toBe( 'www.google.com' )
        expect( createBlog.mock.calls[ 0 ][ 0 ].author ).toBe( 'moussa' )
        expect( createBlog.mock.calls[ 0 ][ 0 ].title ).toBe( 'moss def' )
    } )
} )