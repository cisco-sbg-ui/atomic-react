context("ABadge", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/badge");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Badge 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Badge 2"
    );
  });
});
