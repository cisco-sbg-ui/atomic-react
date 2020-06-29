context("ACheckbox", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-checkboxes--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("validates", () => {
    cy.get("#story--components-checkboxes--rules-1 .a-checkbox__label").click();
    cy.get("#story--components-checkboxes--rules-1 .a-hint").contains(
      "Your information is sold to third parties"
    );

    cy.get("#story--components-checkboxes--rules-1 .a-checkbox__label").click();
    cy.get("#story--components-checkboxes--rules-1 .a-hint").contains(
      "Required"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-checkboxes--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-checkbox--usage-1");

    cy.get("#story--components-checkboxes--wrap-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-checkbox--wrap-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-checkboxes--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-checkbox--dusk-1");
  });
});
