context("ATimeline", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-timeline--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    cy.matchImageSnapshot("a-timeline--theme");
  });
});
