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
} )