/// <reference types="cypress" />

//simple e2e tests using cypress

describe('ElectricityApp', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Electricity App')
    })

    it('front page contains random text', function() {    
        cy.visit('http://localhost:3000')    
        cy.contains('Fetch') 
    })

    it('fetching works', function() {    
      cy.visit('http://localhost:3000')    
      cy.contains('Fetch').click()
      cy.contains('Hakaniemen kauppahalli').click()
  })
  })