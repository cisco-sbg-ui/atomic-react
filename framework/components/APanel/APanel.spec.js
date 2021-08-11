context("APanel", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:3000/components/panel");
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#variants + .playground .playground__preview").compareSnapshot(
      "Panel 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#variants + .playground .playground__preview").compareSnapshot(
      "Panel 2"
    );
  });
});
