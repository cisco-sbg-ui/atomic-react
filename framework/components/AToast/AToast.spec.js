context("AToast", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:3000/components/toast");
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Toast 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Toast 2"
    );
  });
});
