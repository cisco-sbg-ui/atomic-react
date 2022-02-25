context("AAutoTheme", () => {
    before(() => {
        cy
            .visit("localhost:3000/components/theme", {
                onBeforeLoad(win) {
                cy.stub(win, "matchMedia")
                    .withArgs("(prefers-color-scheme: dark)")
                    .returns({
                    matches: true
                    });
                }
            })
    });
  
    it("supports automatic themes", () => {
      if (Cypress.env("snapshots") === "off") return;
  
      cy.get("#usage ~ .playground .playground__preview").eq(2).compareSnapshot(
        "AutoTheme 1"
      );
  
      cy.get("#usage ~ .playground .playground__preview .a-switch").eq(0).click();

      cy.get("#usage ~ .playground .playground__preview").eq(2).compareSnapshot(
        "AutoTheme 2"
      );

      cy.window().then((win) => {
        cy.stub(win, "matchMedia")
          .withArgs("(prefers-color-scheme: dark)")
          .returns({
            matches: false
        });
      })

      cy.get("#usage ~ .playground .playground__preview").eq(2).compareSnapshot(
        "AutoTheme 1"
      );

    });
  });
  