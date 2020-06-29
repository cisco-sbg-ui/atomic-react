context("ASwitch", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-switches--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("validates", () => {
    cy.get("#story--components-switches--rules-1 .a-switch__label").click();
    cy.get("#story--components-switches--rules-1 .a-hint").contains(
      "This feature is potentially unsafe"
    );

    cy.get("#story--components-switches--rules-1 .a-switch__label").click();
    cy.get("#story--components-switches--rules-1 .a-hint").contains("Required");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-switches--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-switch--states-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-switches--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-switch--dusk-1");
  });
});
