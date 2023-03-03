import { REGISTER, HOME, LOGIN, SETTINGS } from '../../../support/enums'

describe('Change Password - Success Scenarios', () => {

    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL") + "login")
        cy.doLogin(Cypress.env("PASSWORD"))
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

            cy.doLogin(pwd.fill_pwd)
        })
    });
});