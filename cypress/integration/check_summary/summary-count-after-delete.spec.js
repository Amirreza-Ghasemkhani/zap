/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Testing summary count after deleting one of the endpoints', () => {
  let enabledAttributes = null
  let enabledClusters = null
  it('create two different endpoints', () => {
    cy.fixture('baseurl').then((data) => {
      cy.visit(data.baseurl)
    })
    cy.fixture('data').then((data) => {
      cy.addEndpoint(data.endpoint1)
      cy.addEndpoint(data.endpoint2)
    })
  })
  it("get second endpoint's summary and delete first endpoint", () => {
    cy.fixture('data').then((data) => {
      cy.get(
        `[data-test="endpoint-card-${data.endpoint2}"] > .q-list > :nth-child(${data.enabledClustersDir}) > [data-test=endpoint-enabled-clusters-amount]`
      ).then(($div2) => {
        const num2 = Number($div2.text())
        enabledClusters = num2
      })
    })
    cy.fixture('data').then((data) => {
      cy.get(
        `[data-test="endpoint-card-${data.endpoint2}"] > .q-list > :nth-child(${data.enbledAttributesDir}) > [data-test=endpoint-enabled-attributes-amount]`
      ).then(($div2) => {
        const num2 = Number($div2.text())
        enabledAttributes = num2
      })
    })
    cy.get('[data-test="delete-endpoint"]').first().click()
    cy.get('.bg-primary > .q-btn__wrapper').click()
  })
  it(
    "check if second endpoint's summary change after deleting the first one",
    { retries: { runMode: 2, openMode: 2 } },
    () => {
      cy.get('[data-test=endpoint-enabled-clusters-amount]').then(($div1) => {
        const num2 = Number($div1.text())
        expect(num2).to.eq(enabledClusters)
      })
      cy.get('[data-test=endpoint-enabled-attributes-amount]').then(($div1) => {
        const num2 = Number($div1.text())
        expect(num2).to.eq(enabledAttributes)
      })
    }
  )
})
