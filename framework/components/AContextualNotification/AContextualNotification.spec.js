context("AContextualNotification", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/components/contextual-notification"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").toMatchImageSnapshot();

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").toMatchImageSnapshot();
  });
});
