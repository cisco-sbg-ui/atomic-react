context("ASelect", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-selects--usage-1&viewMode=docs"
    );
  });

  it("has a label that works", () => {
    cy.get("#story--components-selects--usage-1 .a-select__label")
      .eq(0)
      .click()
      .then(($el) => {
        const labelId = $el.attr("id");
        cy.get("#story--components-selects--usage-1 .a-select__surface")
          .eq(0)
          .then(($el2) => {
            Cypress.dom.isFocused($el2);
            cy.wrap($el2).should("have.attr", "aria-labelledby", labelId);
          });
      });
  });

  it("opens and closes appropriately", () => {
    cy.get("#story--components-selects--usage-1 .a-select__menu-items")
      .eq(0)
      .should("not.be.visible");
    cy.get("#story--components-selects--usage-1 .a-select__surface")
      .eq(0)
      .click();
    cy.get("#story--components-selects--usage-1 .a-select__menu-items")
      .eq(0)
      .should("be.visible")
      .type("{esc}")
      .should("not.be.visible")
      .prev()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("tabs appropriately", () => {
    cy.get("#story--components-selects--usage-1 .a-select__surface")
      .eq(0)
      .focus()
      .tab();
    cy.get("#story--components-selects--usage-2 .a-select__surface")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });

    cy.get("#story--components-selects--usage-1 .a-select__surface")
      .eq(0)
      .click()
      .tab();
    cy.get("#story--components-selects--usage-1 .a-select__menu-items")
      .eq(0)
      .should("not.be.visible");
    cy.get("#story--components-selects--usage-2 .a-select__surface")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("arrow-keys menus appropriately", () => {
    cy.get("#story--components-selects--usage-1 .a-select__surface")
      .eq(0)
      .click()
      .next()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{downArrow}")
      .find(".a-select__menu-item")
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

    cy.get("#story--components-selects--usage-1 .a-select__surface")
      .eq(0)
      .click()
      .next()
      .type("{upArrow}")
      .find(".a-select__menu-item")
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

  it("arrow-keys the surface appropriately", () => {
    cy.get("#story--components-selects--usage-1 .a-select__surface")
      .eq(0)
      .focus()
      .type("{downArrow}")
      .contains("Bread")
      .parent()
      .type("{upArrow}")
      .contains("Fats")
      .parent()
      .type("{downArrow}{downArrow}")
      .contains("Vegetables")
      .parent()
      .type("{upArrow}");
  });

  it("has working selected prop", () => {
    cy.get("#story--components-selects--usage-2 .a-select__surface")
      .eq(0)
      .click();
    cy.get("#story--components-selects--usage-2 .a-select__menu-item")
      .eq(2)
      .should("have.class", "a-select__menu-item--selected")
      .type("{esc}");
  });

  it("has appropriate role attributes", () => {
    cy.get("#story--components-selects--usage-1 .a-select__surface")
      .eq(0)
      .click()
      .next()
      .should("have.attr", "role", "listbox")
      .find(".a-select__menu-item")
      .first()
      .should("have.attr", "role", "option")
      .type("{esc}");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000);

    cy.get("#story--components-selects--usage-1 .a-select__surface")
      .first()
      .click();

    cy.get("#story--components-selects--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-select--usage-1");

    cy.get("#story--components-selects--dusk-1 .a-select__surface")
      .first()
      .focus()
      .type("{downArrow}")
      .click();

    cy.get("#story--components-selects--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-select--dusk-1");
  });
});
