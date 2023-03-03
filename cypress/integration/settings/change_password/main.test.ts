import { REGISTER, HOME, LOGIN, SETTINGS } from '../../../support/enums'

describe('Change Password - Success Scenarios', () => {

    function login(password) {
        cy.get(LOGIN.INPUT_LOGIN)
            .should('be.visible')
            .type(Cypress.env("EMAIL"))

        cy.get(LOGIN.INPUT_PASSWORD)
            .should('be.visible')
            .type(password)

        cy.get(LOGIN.BTN_LOGIN)
            .should('be.visible')
            .click()

        cy.get(HOME.DIV_TO_BAR)
            .should('contain', Cypress.env("NAME"))
    }

    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL") + "login")
        login(Cypress.env("PASSWORD"))

    })
    it('Should change password', () => {
        const change_and_return_the_original_password = [
            {
                fill_pwd: Cypress.env("TO_CHANGE_PWD")
            },
            {
                fill_pwd: Cypress.env("PASSWORD")
            },
        ]

        change_and_return_the_original_password.map(pwd => {
            cy.get(HOME.BTN_SETTINGS)
                .should('be.visible')
                .click()

            cy.url()
                .should('contain', Cypress.env("BASE_URL") + '/settings')

            cy.get(SETTINGS.BTN_NEW_PASSWORD)
                .should('be.visible')
                .type(pwd.fill_pwd)

            cy.get(SETTINGS.BTN_UPDATE_SETTINGS)
                .should('be.visible')
                .click()

            cy.url()
                .should('contain', '@Neithan%20Cipreste')

            cy.get(HOME.BTN_SETTINGS)
                .eq(0)
                .should('be.visible')
                .click()


            cy.get(SETTINGS.BTN_LOGOUT)
                .should('be.visible')
                .click()
                .then(() => {
                    cy.get(HOME.BTN_SIGN_IN)
                        .should('be.visible')
                        .click()                   
                })

            //Realiza Login 

            login(pwd.fill_pwd)
        })



    });

});