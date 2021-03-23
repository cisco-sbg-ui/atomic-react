context("ABreakpoint", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/services/breakpoint");
  });

  it("works", () => {
    cy.get("#usage + .playground").contains("Extra Large");
  });
});
