import { LOGIN, HOME } from '../../support/enums'

describe('should post an article - Success Scenarios', () => {
    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL"))
        cy.get('a[href="#/login"]')
            .should('be.visible')
            .click()

        cy.get(LOGIN.INPUT_LOGIN)
            .should('be.visible')
            .type(Cypress.env("EMAIL"))

        cy.get(LOGIN.INPUT_PASSWORD)
            .should('be.visible')
            .type(Cypress.env("PASSWORD"))

        cy.get(LOGIN.BTN_LOGIN)
            .should('be.visible')
            .click()

        cy.get(HOME.DIV_TO_BAR)
            .should('contain', Cypress.env("NAME"))

    })
})
