context("ATextInput", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-context--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    cy.matchImageSnapshot("a-context--theme");
  });
});
