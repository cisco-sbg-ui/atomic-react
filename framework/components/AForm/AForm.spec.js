context("AForm", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-forms--usage-1&viewMode=docs"
    );
  });

  it("validates", () => {
    cy.get("#story--components-forms--usage-1 .a-button").eq(1).click();
    cy.get("#story--components-forms--usage-1 .a-input-base__hint")
      .eq(0)
      .contains("Email is required");
    cy.get("#story--components-forms--usage-1 .a-input-base__hint")
      .eq(1)
      .contains("Role is required");
    cy.get("#story--components-forms--usage-1 .a-input-base__hint")
      .eq(2)
      .contains("Comments is required");

    cy.get("#story--components-forms--usage-1 .a-alert")
      .eq(0)
      .contains("There are 3 validation errors on the form.");
  });

  it("resets", () => {
    cy.get("#story--components-forms--usage-1 .a-button").eq(0).click();
    cy.get("#story--components-forms--usage-1 .a-input-base__hint")
      .eq(0)
      .contains("Please use a business email address");
    cy.get(
      "#story--components-forms--usage-1 .a-select .a-input-base__hint"
    ).should("not.exist");
    cy.get("#story--components-forms--usage-1 .a-input-base__hint")
      .eq(1)
      .contains("Keep it short");
  });
});
