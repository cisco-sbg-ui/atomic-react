context("ACheckbox", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-checkboxes--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-checkboxes--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-checkbox--usage-1");

    cy.get("#story--components-checkboxes--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-checkbox--dusk-1");
  });
});
