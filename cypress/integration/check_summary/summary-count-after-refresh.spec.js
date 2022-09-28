/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Testing summary count after refreshing the page', () => {
  let enabledAttributes = null;

  it('create three different endpoints', () => {
    cy.fixture('baseurl').then((data) => {
      cy.visit(data.baseurl)
    })
    cy.fixture('data').then((data) => {
      cy.addEndpoint(data.endpoint1)
      cy.addEndpoint(data.endpoint2)
      cy.addEndpoint(data.endpoint3)
    })
  })
  it("get third endpoint's enabled attributes amount and refresh the page", () => {
    cy.fixture('data').then((data) => {
      cy.get(
        `[data-test="endpoint-card-${data.endpoint3}"] > .q-list > :nth-child(${data.enbledAttributesDir}) > [data-test=endpoint-enabled-attributes-amount]`
      ).then(($div2) => {
        const num2 = Number($div2.text())
        enabledAttributes = num2
      })
    })
    cy.reload()
  })
  it(
    "check if third endpoint's enabled attributes amount change after refresh",
    { retries: { runMode: 2, openMode: 2 } },
    () => {
      cy.fixture('data').then((data) => {
        cy.get(
          `[data-test="endpoint-body-toggler-show-${data.endpoint3}"]`
        ).click()
        cy.get(
          `[data-test="endpoint-card-${data.endpoint3}"] > .q-list > :nth-child(${data.enbledAttributesDir}) > [data-test=endpoint-enabled-attributes-amount]`
        ).then(($div2) => {
          const num2 = Number($div2.text())
          expect(num2).to.eq(enabledAttributes)
        })
      })
    }
  )
})
