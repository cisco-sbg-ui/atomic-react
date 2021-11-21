context("ABreadcrumb", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:3000/components/breadcrumb");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Breadcrumb 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Breadcrumb 2"
    );
  });
});
