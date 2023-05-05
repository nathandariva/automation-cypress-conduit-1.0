import { LOGIN, HOME, NEW_ARTICLE, ARTICLE } from '../../support/enums'

describe('Post an article - Success Scenarios', () => {
    beforeEach(() => {
        cy.visit(Cypress.env("BASE_URL") + "login")
        cy.doLogin(Cypress.env("PASSWORD"))

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

        cy.get(ARTICLE.DIV_TITLE)
            .should('be.visible')
            .and('have.text', 'Automação com Cypress Teste')

        cy.get("button[class*='btn-outline-dange']").eq(1).click()
    });
})

describe('Attempting to post an article - Alternative Scenarios', () => {

    it('Validating error messages when keeping fields blank', () => {
        cy.visit(Cypress.env("BASE_URL") + "login")
        cy.doLogin(Cypress.env("PASSWORD"))

        cy.get(HOME.BTN_NEW_ARTICLE)
            .should('be.visible')
            .click();

        cy.url()
            .should('contain', 'editor');



        const validMessageAndFillInTheFields = [
            {
                msgError: "title can't be blank",
                fieldsEq: 0,
                fillFields: "Any title"
            },

            {
                msgError: "description can't be blank",
                fieldsEq: 1,
                fillFields: "Any description"
            },

            {
                msgError: "body can't be blank",
                fieldsEq: 0,
                fillFields: " "
            },

        ]


        cy.get(NEW_ARTICLE.BTN_PUBLISH)
            .should('be.visible')
            .click()

        validMessageAndFillInTheFields.map(validate => {
            cy.get(ARTICLE.MSG_ERROR)
                .should('be.visible')
                .and('contain', validate.msgError)

            cy.get(NEW_ARTICLE.INPUTS)
                .eq(validate.fieldsEq)
                .type(validate.fillFields)

            cy.get(NEW_ARTICLE.BTN_PUBLISH)
                .should('be.visible')
                .click()
        })
    });
});
