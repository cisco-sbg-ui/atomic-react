context("AButton", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/button");
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();

    cy.get(".a-switch__box").eq(0).click();

    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();
  });
});
