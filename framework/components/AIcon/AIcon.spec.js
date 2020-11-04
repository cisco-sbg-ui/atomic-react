context("AIcon", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-icons--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-icons--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-icon--usage-1");
  });
});
