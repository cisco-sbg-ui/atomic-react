context("ARadio", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-radio-buttons--usage-1&viewMode=docs"
    );
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("supports themes", () => {
    cy.get("#story--components-radio-buttons--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-radio-buttons--states-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-radio-buttons--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-radio-buttons--dusk-1");
  });
});
