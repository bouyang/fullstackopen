describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'adminName test',
      username: 'admin',
      password: '123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
    cy.contains('Blog app')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('123')
    cy.get('#login-button').click()

    cy.contains('adminName test logged-in')
  })

  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong credentials')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: '123' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogTitleInput').type('a blog created by cypress')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'cyp2',
          url: 'url2'
        })
      })

      it('it can be viewed/hidden', function () {
        cy.contains('view')
          .click()

        cy.contains('hide')
      })
    })
  })
})