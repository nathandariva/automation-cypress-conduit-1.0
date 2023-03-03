import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

declare global {
  namespace Cypress {
    interface Chainable {
      doLogin(pwd: string): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {}
