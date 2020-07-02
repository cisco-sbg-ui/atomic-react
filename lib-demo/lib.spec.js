context("lib", () => {
  before(() => {
    cy.visit("http://localhost:8080/");
  });

  it("loads", () => {
    cy.get(".a-accordion");
  });
});
