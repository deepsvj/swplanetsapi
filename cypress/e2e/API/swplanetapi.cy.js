///<reference types = "cypress">


describe('SW Planets api tests', () => {
  beforeEach(() => {
    // Test data here -> cypress/fixtures/planetsData1.json
    cy.fixture('planetsData1.json').as('planetsData');
  });


  it ('Verify and assert required fields and status code of api response', () => {
    let counter = 0
    cy.request(Cypress.config('apiUrl')).then((resp) => {
      // Assertion to verify status code, pagination details for page1
      expect(resp.status).to.eq(200)
      expect(resp.body.next).contains("page=2")
      expect(resp.body.previous).to.eq(null)

      //Assertion to verify if all required fields exist and their data type

      const respData = resp.body.results
      respData.forEach(element => {
        expect(element).to.have.property("name").to.be.an('string')
        expect(element).to.have.property("rotation_period").to.be.an('string')
        expect(element).to.have.property("orbital_period").to.be.an('string')
        expect(element).to.have.property("diameter").to.be.an('string')
        expect(element).to.have.property("climate").to.be.an('string')
        expect(element).to.have.property("gravity").to.be.an('string')
        expect(element).to.have.property("terrain").to.be.an('string')
        expect(element).to.have.property("surface_water").to.be.an('string')
        expect(element).to.have.property("population").to.be.an('string')
        expect(element).to.have.property("residents").to.be.an('array')
        expect(element).to.have.property("films").to.be.an('array')
        expect(element).to.have.property("created")
        const created_date = element.created
        const edited_date = element.edited
        cy.validateDate(created_date)
        expect(element).to.have.property("edited")
        cy.validateDate(edited_date)
        expect(element).to.have.property("url")
        counter = counter + 1
        expect(element.url).to.eq(`${Cypress.config('apiUrl')}/${counter}/`)

      });

    })

  })

  it('Verify if Resident links are valid', () => {
    cy.request(Cypress.config('apiUrl')).then((resp) => {
      // Iterating through all resident urls and verifying if request to resident url gives 200 response
      const planetResponse = resp.body.results
      planetResponse.forEach(element => {
        element.residents.forEach(residentUrl => {
          cy.request(residentUrl).then((response) => {
            expect(response.status).to.eq(200)

          })

        })

      })

    })

  })

  it('Verify Film links are valid', () => {
    cy.request(Cypress.config('apiUrl')).then((resp) => {
       // Iterating through all films urls and verifying if request to film url gives 200 response

      const planetResponse = resp.body.results
      planetResponse.forEach(element => {

        element.films.forEach(filmsUrl => {
          cy.request(filmsUrl).then((response) => {
            expect(response.status).to.eq(200)
          })

        })
      })

    })

  })

  it('Validate pagination', () => {
    var pageCount
    cy.request(Cypress.config('apiUrl')).then((resp) => {
      pageCount = (resp.body.count) / 10
    })
    cy.then(() => {
      //Pagination to the last page and verify pagination details . Next value should be null
      cy.request(`${Cypress.config('apiUrl')}/?page=${pageCount}`).then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body.next).to.eq(null)
        expect(resp.body.previous).contains(`${pageCount - 1}`)
      })

    })

  })


  it('Validate and assert values for specific planet ', function () {

    cy.request(`${Cypress.config('apiUrl')}/1`).then((resp) => {

      expect(resp.body).to.have.property('name', this.planetsData.name)
      expect(resp.body).to.have.property('rotation_period', this.planetsData.rotation_period)
      expect(resp.body).to.have.property('orbital_period', this.planetsData.orbital_period)
      expect(resp.body).to.have.property('diameter', this.planetsData.diameter)
      expect(resp.body).to.have.property('climate', this.planetsData.climate)
      expect(resp.body).to.have.property('surface_water', this.planetsData.surface_water)
      expect(resp.body).to.have.property('terrain', this.planetsData.terrain)
      expect(resp.body).to.have.property('population', this.planetsData.population)
      expect(resp.body.residents).to.deep.equal(this.planetsData.residents1)
      expect(resp.body.films).to.deep.equal(this.planetsData.films1)


    })

  })


  it('Validate status code for invalid api', () => {

    cy.request({ url: `${Cypress.config('apiUrl')}/108889@`, failOnStatusCode: false }).then((resp) => {
      expect(resp.status).to.eq(404)

    })

  })








})