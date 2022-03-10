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

    // Turn auto theming off - when the automatic theming is disabled,
    // it should keep whatever theme the automatic theme was set to
    cy.get(".root-sidebar .a-switch__box").eq(0).click();
    cy.get(".root-sidebar .a-switch").compareSnapshot(
      "AutoTheme 3"
    );

   // Switch back to light theme
    cy.get("[data-testid='enable-default-theme']").eq(0).click();
    cy.get(".root-sidebar .a-switch").compareSnapshot(
      "AutoTheme 1"
    );

    // When re-enabling automatic theming, it should match the user agent
    // style sheet (in this cae it is dark mode);
    cy.get(".root-sidebar .a-switch__box").eq(0).click();
    cy.get(".root-sidebar .a-switch").compareSnapshot(
      "AutoTheme 2"
    );
  });
})
