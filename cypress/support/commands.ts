import { REGISTER, HOME, LOGIN, SETTINGS } from '../support/enums'

Cypress.Commands.add("doLogin", (pwd) => {
    cy.get(LOGIN.INPUT_LOGIN)
        .should('be.visible')
        .type(Cypress.env("EMAIL"))

    cy.get(LOGIN.INPUT_PASSWORD)
        .should('be.visible')
        .type(pwd)

    cy.get(LOGIN.BTN_LOGIN)
        .should('be.visible')
        .click()

    cy.get(HOME.DIV_TO_BAR)
        .should('contain', Cypress.env("NAME"))

})