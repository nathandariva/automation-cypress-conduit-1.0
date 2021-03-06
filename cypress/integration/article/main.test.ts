import { LOGIN, HOME, NEW_ARTICLE } from '../../support/enums'

describe('Post an article - Success Scenarios', () => {
    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL") + "login")

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

    it('Should post a new article', () => {

        const fillFieldsArticle = [
            {
                eq: 0,
                fill: 'Automação com Cypress Teste'
            },
            {
                eq: 1,
                fill: 'Preparando o setup'
            },
            {
                eq: 2,
                fill: '#cypress #automation #automacao'
            },
        ]
            
            cy.get(HOME.BTN_NEW_ARTICLE)
            .should('be.visible')
            .click();
            
        cy.url()
            .should('contain', 'editor');

        fillFieldsArticle.map(field => {
            cy.get(NEW_ARTICLE.INPUTS)
                .eq(field.eq)
                .should('be.visible')
                .type(field.fill)
        })

        cy.get(NEW_ARTICLE.TEXTAREA)
            .should('be.visible')
            .type('Teste teste teste teste tsese tsteste teste teste test')

        cy.get(NEW_ARTICLE.BTN_PUBLISH)
            .should('be.visible')
            .click()

        cy.url()
            .should('contain', 'article/');

        cy.get('div h1')
        .should('be.visible')
        .and('have.text', 'Automação com Cypress Teste')

        cy.get("button[class*='btn-outline-dange']").eq(1).click()      
    });
})
