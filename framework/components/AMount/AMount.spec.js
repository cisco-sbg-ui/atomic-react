context("AMount", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/mount");
  });

  it("works", () => {
    cy.get("#usage + .playground .a-button").eq(1).click();
  });
});
