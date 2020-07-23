context("AMenu", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-menus--usage-1&viewMode=docs"
    );
  });

  it("opens and closes appropriately", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(".a-menu").should("not.be.visible");
    cy.get("#story--components-menus--usage-1 .a-button").eq(0).click();
    cy.get(".a-menu")
      .eq(0)
      .should("be.visible")
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{esc}");
    cy.get(".a-menu").should("not.be.visible");
    cy.get("#story--components-menus--usage-1 .a-button")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });

    cy.get("#story--components-menus--usage-1 .a-button").eq(0).click();
    cy.get(".a-menu")
      .eq(0)
      .find(".a-list-item")
      .first()
      .click()
      .then(() => {
        cy.get(".a-menu").should("not.be.visible");
      });
  });

  it("tabs appropriately", () => {
    cy.get("#story--components-menus--usage-1 .a-button").eq(0).focus().tab();
    cy.get("#story--components-menus--usage-2 .a-button")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });

    cy.get("#story--components-menus--usage-1 .a-button").eq(0).click().tab();
    cy.get(".a-menu").should("not.be.visible");
    cy.get("#story--components-menus--usage-2 .a-button")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("arrow-keys appropriately", () => {
    cy.get("#story--components-menus--usage-1 .a-button").eq(0).click();
    cy.get(".a-menu")
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{downArrow}")
      .find(".a-list-item[tabindex]")
      .first()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{downArrow}")
      .next()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{esc}");

    cy.get("#story--components-menus--usage-1 .a-button").eq(0).click();
    cy.get(".a-menu")
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{upArrow}")
      .find(".a-list-item[tabindex]")
      .last()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{upArrow}")
      .prev()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{esc}");
  });

  it("has appropriate role attributes", () => {
    cy.get("#story--components-menus--usage-1 .a-button").eq(0).click();
    cy.get(".a-menu")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .should("have.attr", "role", "menu")
      .find(".a-list-item")
      .first()
      .should("have.attr", "role", "menuitem")
      .type("{esc}");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-menus--usage-1 .a-button")
      .first()
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click();

    cy.get("#story--components-menus--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-menu--usage-1");

    cy.get("#story--components-menus--usage-3 .a-button")
      .first()
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click();

    cy.get("#story--components-menus--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-menu--usage-2");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-menus--usage-1 .a-button")
      .first()
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click();

    cy.get("#story--components-menus--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-menu--dusk-1");

    cy.get("#story--components-menus--usage-3 .a-button")
      .first()
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click();

    cy.get("#story--components-menus--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-menu--dusk-2");
  });
});
