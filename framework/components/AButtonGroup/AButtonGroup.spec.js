context("AButtonGroup", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/button-group");
  });

  // TODO: Test interactability

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").toMatchImageSnapshot();

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").toMatchImageSnapshot();
  });
});
