context("ATimeline", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:3000/components/timeline");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Timeline 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "Timeline 2"
    );
  });
});
