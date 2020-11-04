context("AProgressbar", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-progressbars--usage-1&viewMode=docs"
    );
  });

  // TODO: Test accessibility
  it("is accessible", () => {
    cy.get("#story--components-progressbars--states-1 .a-progressbar")
      .eq(0)
      .should("have.attr", "aria-valuemin", "0")
      .should("have.attr", "aria-valuemax", "100")
      .should("have.attr", "aria-valuenow", "50")
      .should("have.attr", "role", "progressbar");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get(".a-app").invoke("removeClass", ".a-app--animated");

    cy.get("#story--components-progressbars--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-progressbars--states-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-progressbars--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-progressbars--dusk-1");
  });
});
