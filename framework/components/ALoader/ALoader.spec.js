context("ALoader", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-loaders--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility

  // Screenshots aren't going to work for always-animating things.
});
