context("AFooter", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/footer");
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").toMatchImageSnapshot();

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").toMatchImageSnapshot();
  });
});
