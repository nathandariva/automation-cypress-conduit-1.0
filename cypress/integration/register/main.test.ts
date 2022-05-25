import { Chance } from 'chance'
import { REGISTER, HOME } from '../../support/enums'

function accessScreenRegister() {
    cy.visit(Cypress.env("BASE_URL"))

    cy.get(HOME.BTN_SIGN_UP)
        .click()

    cy.url()
        .should('include', 'register')
}
describe('Perform Registration - Success Scenarios', () => {

    it('Should register on the platform - Sign Up', () => {
        const fillFields = [
            {
                eq: 0,
                input: Chance().name()
            },
            {
                eq: 1,
                input: Chance().email({ domain: "conduit.com" })
            },
            {
                eq: 2,
                input: 'PasSwOrdAletorY123'
            }
        ]

        accessScreenRegister()

        for (let indice = 0; indice < fillFields.length; indice++) {
            cy.get(REGISTER.INPUTS)
                .eq(fillFields[indice].eq)
                .should('be.visible')
                .type(fillFields[indice].input)
        }

        cy.get(REGISTER.BTN_SIGN_UP)
            .should('be.visible')
            .click()

        cy.url().should('contain', '/#/')

        cy.get(HOME.DIV_TO_BAR)
            .should('contain', `${fillFields[0].input}`)

        cy.get(HOME.BTN_YOUR_FEED)
            .eq(0)
            .should('be.visible')
            .and('contain', 'Your Feed')
    })
})

describe('Registration Attempts - Alternative Scenarios', () => {
    it('Should validate without filling - Blank fields', () => {
        accessScreenRegister()

        cy.get(REGISTER.BTN_SIGN_UP).click()
        cy.get('.error-messages')
            .should('be.visible')
            .and('contain', "email can't be blank")
    })

    it('Should validate with login already created', () => {
        const alternativeScenarios = [
            {
                input: Cypress.env("NAME"),
                eq: 0
            },
            {
                input: Cypress.env("EMAIL"),
                eq: 1
            },
            {
                input: Cypress.env("PASSWORD"),
                eq: 2
            }
        ]

        for (let indice = 0; indice < alternativeScenarios.length; indice++) {
            cy.get(REGISTER.INPUTS)
                .eq(alternativeScenarios[indice].eq)
                .should('be.visible')
                .type(alternativeScenarios[indice].input)
        }

        cy.get(REGISTER.BTN_SIGN_UP).click()
        cy.get('.error-messages')
            .should('be.visible')
            .and('contain', "email has already been taken")
            .and('contain', "username has already been taken")
    });
})