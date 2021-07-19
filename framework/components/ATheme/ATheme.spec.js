context("ATheme", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/theme");
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Theme 1"
    );

    cy.get("#usage + .playground .playground__preview .a-button").eq(1).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Theme 2"
    );
  });
});
