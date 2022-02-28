context("AAutoTheme", () => {
  it("persists automatic themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.visitInLightTheme("http://localhost:3000/components/theme");

    cy.get(".root-sidebar .a-switch").compareSnapshot(
      "AutoTheme 1"
    );

    cy.get(".root-sidebar .a-switch__box").eq(0).click();

    cy.visit("localhost:3000/components/theme", {
      onBeforeLoad(win) {
        cy.stub(win, "matchMedia")
            .withArgs("(prefers-color-scheme: dark)")
            .returns({
              matches: true
            });
      }
    });

    cy.get(".root-sidebar .a-switch").compareSnapshot(
      "AutoTheme 2"
    );
    });
})
