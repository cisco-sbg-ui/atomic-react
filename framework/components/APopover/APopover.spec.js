context("APopover", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/popover");
  });

  it("handles onClose", () => {
    cy.get("#onclose-handling + .playground .a-button").click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get(".a-app .a-menu-base").first().click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get("#onclose-handling + .playground .a-button").click();
    cy.get(".a-app .a-menu-base").should("not.exist");

    cy.get("#onclose-handling + .playground .a-button").click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get("#onclose-handling + .playground .playground__preview").click(
      "left"
    );
    cy.get(".a-app .a-menu-base").should("not.exist");
  });

  it("has working keyboard events", () => {
    cy.get(".a-popover").should("not.be.visible");
    cy.get("#usage + .playground .a-button").eq(0).click();
    cy.get(".a-popover")
      .eq(0)
      .should("be.visible")
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{esc}");
    cy.get(".a-popover").should("not.be.visible");
    cy.get("#usage + .playground .a-button")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });

    // TODO: test tab key functionality once cypress supports it.
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#position + .playground").scrollIntoView();
    cy.get("#position + .playground .a-button").eq(0).click({force: true});

    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(1).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(2).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(3).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(4).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(5).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(6).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(7).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(8).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(9).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(10).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(11).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get(".a-switch__box").eq(0).click();
    cy.get("#position + .playground").scrollIntoView();

    cy.get("#position + .playground .a-button").eq(0).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(1).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(2).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(3).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(4).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(5).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(6).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(7).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(8).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(9).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(10).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#position + .playground .a-button").eq(11).click({force: true});
    cy.get(
      "#position + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get(".a-popover .a-button").eq(0).click({force: true});
  });
});
