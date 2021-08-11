context("ARadio", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:3000/components/radio");
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#states + .playground .playground__preview").compareSnapshot(
      "Radio 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#states + .playground .playground__preview").compareSnapshot(
      "Radio 2"
    );
  });
});
