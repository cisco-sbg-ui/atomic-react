context("ACheckbox", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-checkboxes--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    cy.get("#story--components-checkboxes--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-checkbox--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-checkboxes--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-checkbox--dusk-1");
  });
});
