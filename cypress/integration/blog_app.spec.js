/// <reference types="cypress" />
describe( 'Blog app',function () {
    const url = 'http://localhost:3003'
    beforeEach( function () {
        cy.request( 'POST',url + '/api/testing/reset' )
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request( 'POST',url + '/api/users',user )
        cy.visit( 'http://localhost:3000' )
    } )

    it( 'Login form is shown',function () {
        cy.contains( 'login' )
    } )

    describe( 'Login',function () {
        it( 'fails with wrong credentials',function () {
            cy.contains( 'login' ).click()
            cy.get( '#username' ).type( 'mluukkai' )
            cy.get( '#password' ).type( 'salai' )
            cy.get( '#login-button' ).click()
            cy.get( '.fail' ).should( 'contain','Wrong username or password' )
                .and( 'have.css','border-color','rgb(255, 0, 0)' )
                .and( 'have.css','color','rgb(255, 0, 0)' )
        } )
        it( 'succeeds with correct credentials',function () {
            cy.contains( 'login' ).click()
            cy.get( '#username' ).type( 'mluukkai' )
            cy.get( '#password' ).type( 'salainen' )
            cy.get( '#login-button' ).click()
            cy.contains( 'Matti Luukkainen is logged-in' )
        } )

    } )

    describe( 'When Logged in',function () {
        beforeEach( function () {
            cy.login( { username: 'mluukkai',password: 'salainen' } )
        } )
        it( 'A blog can be created',function () {
            cy.contains( 'create new' ).click()
            cy.get( '.title' ).type( 'basket' )
            cy.get( '.author' ).type( 'amath' )
            cy.get( '.url' ).type( 'basketusa.com' )
            cy.get( '.save' ).click()
            cy.get( '.resume' ).contains( 'basket amath' )
            cy.contains( 'a new blog basket by amath added' )
        } )
        it( 'A blog can be liked',function () {
            cy.createBlog( { title: 'libellule',author: 'mouha',url: 'mouha.com' } )
            cy.contains( 'libellule mouha' ).find( '.shown' ).click()
            cy.get( '.likeButton' ).click()
            cy.get( '.likes' ).contains( '1' )
        } )
        it.only( 'A blog can be deleted',function () {
            cy.createBlog( { title: 'libellule',author: 'mouha',url: 'mouha.com' } )
            cy.contains( 'libellule mouha' ).find( '.shown' ).click()
            cy.get( '.delete' ).click()
            cy.get( '.blog' ).should( 'not.contain','libellule mouha' )
        } )

    } )
} )