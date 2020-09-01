context("AToaster", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=services-toaster--usage-1&viewMode=docs"
    );
  });

  it("works", () => {
    cy.get("#story--services-toaster--usage-1 .a-button").eq(0).click();
    cy.get(".a-app .a-toast-plate .a-toaster__toast").should("have.length", 1);
    cy.wait(5000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get(".a-app .a-toast-plate .a-toaster__toast").should("have.length", 0);

    cy.get("#story--services-toaster--usage-1 .a-button").eq(1).click();
    cy.get(".a-app .a-toast-plate .a-toaster__toast").should("have.length", 1);
    cy.wait(3000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get(".a-app .a-toast-plate .a-toaster__toast").should("have.length", 0);

    cy.get("#story--services-toaster--usage-1 .a-button").eq(2).click();
    cy.get(".a-app .a-toast-plate .a-toaster__toast").should("have.length", 1);
    cy.get(".a-app .a-toast-plate .a-toaster__toast .a-toast__close").click();
    cy.get(".a-app .a-toast-plate .a-toaster__toast").should("have.length", 0);

    cy.get("#story--services-toaster--usage-1 .a-button").eq(3).click();
    cy.get(".a-app .a-toast-plate .a-toaster__toast").should("have.length", 1);
    cy.wait(5000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get(".a-app .a-toast-plate .a-toaster__toast")
      .eq(0)
      .should("have.attr", "aria-live", "polite");
    cy.get(".a-app .a-toast-plate .a-toaster__toast")
      .eq(0)
      .should("have.attr", "role", "status");
    cy.get(".a-app .a-toast-plate .a-toaster__toast .a-toast__close").click();
    cy.get(".a-app .a-toast-plate .a-toaster__toast").should("have.length", 0);
  });
});
