context("ATextInput", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-contextual-notifications--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-contextual-notifications--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification--usage-1");

    cy.get("#story--components-contextual-notifications--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification--dusk-1");
  });
});
