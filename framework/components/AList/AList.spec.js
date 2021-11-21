context("AList", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:3000/components/list");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "List 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "List 2"
    );
  });
});
