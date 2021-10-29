context("AFieldBase", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/extend/field-base");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "FieldBase 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "FieldBase 2"
    );
  });
});
