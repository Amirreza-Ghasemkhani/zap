/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('Testing summary count after deleting one of the endpoints', () => {
  it('create an endpoint', () => {
    cy.fixture('baseurl').then((data) => {
      cy.visit(data.baseurl)
    })

    cy.fixture('data').then((data) => {
      if (data.type === 'zigbee') {
        cy.get('[data-test="add-new-endpoint"]').click()
        cy.get('[data-test="select-endpoint-input"]')
          .click()
          .clear({ force: true })
          .type('GP', { force: true })
        cy.get('div').contains("GP Proxy (0x0060)").click({ force: true })
        cy.get('button').contains('Create').click()
      } else {
        cy.addEndpoint(data.endpoint1)
      }
    })
    
  })

  it(
    'filter enabled clusters and disable clusters',
    { retries: { runMode: 2, openMode: 2 } },
    () => {
      cy.get('[data-test="filter-input"]').click()
      cy.get('.q-virtual-scroll__content > :nth-child(3)').click({
        force: true,
      })
      cy.fixture('data').then((data) => {
        if (data.type === 'zigbee') {
        
          cy.get(
            ':nth-child(6) > .q-field > .q-field__inner > .q-field__control'
          ).click()
          cy.get('div').children().contains('Not Enabled').click()
        } else {
          cy.get('[data-test="cluster-enable-input"').first().click()
          cy.get('div').children().contains('Not Enabled').click()
          cy.get('[data-test="cluster-enable-input"').first().click()
          cy.get('div').children().contains('Not Enabled').click()
           cy.get('[data-test="cluster-enable-input"').first().click()
          cy.get('div').children().contains('Not Enabled').click()
          cy.get('[data-test="cluster-enable-input"').first().click()
          cy.get('div').children().contains('Not Enabled').click()
        }
      })
    }
  )
  it(
    'check if summary numbers are zero',
    { retries: { runMode: 2, openMode: 2 } },
    () => {
        cy.get('[data-test=endpoint-enabled-clusters-amount]').then(($div1) => {
          const num2 = Number($div1.text())
          expect(num2).to.eq(0)
        })
        cy.get('[data-test=endpoint-enabled-attributes-amount]').then(
          ($div1) => {
            const num2 = Number($div1.text())
            expect(num2).to.eq(0)
          }
        )
    }
  )
})
