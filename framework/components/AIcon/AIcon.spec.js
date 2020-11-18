context("AIcon", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/icon");
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").toMatchImageSnapshot();
  });
});
