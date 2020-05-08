context("ACombobox", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-comboboxes--usage-1&viewMode=docs"
    );
  });

  it("has a label that works", () => {
    cy.get("#story--components-comboboxes--usage-1 .a-input-base__label")
      .eq(0)
      .click()
      .then(($el) => {
        const labelFor = $el.attr("for");
        cy.get("#story--components-comboboxes--usage-1 .a-combobox__input")
          .eq(0)
          .then(($el2) => {
            Cypress.dom.isFocused($el2);
            cy.wrap($el2).should("have.attr", "id", labelFor);
          });
      });
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__chevron")
      .eq(0)
      .click();
  });

  it("opens and closes appropriately", () => {
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__menu-items")
      .eq(0)
      .should("not.be.visible");
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__chevron")
      .eq(0)
      .click();
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__menu-items")
      .eq(0)
      .should("be.visible")
      .prev()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__chevron")
      .eq(0)
      .click();
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__menu-items")
      .eq(0)
      .should("not.be.visible");
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__input")
      .eq(0)
      .type("{downArrow}");
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__menu-items")
      .eq(0)
      .should("be.visible");
  });

  it("tabs appropriately", () => {
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__input")
      .eq(0)
      .click()
      .tab();
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__menu-items")
      .eq(0)
      .find(".a-combobox__menu-item")
      .first()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .tab();
    cy.get("#story--components-comboboxes--usage-2 .a-combobox__input")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("arrow-keys menus appropriately", () => {
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__input")
      .eq(0)
      .type("{downArrow}");
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__menu-items")
      .eq(0)
      .find(".a-combobox__menu-item")
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

    cy.get("#story--components-comboboxes--usage-1 .a-combobox__input")
      .eq(0)
      .type("{upArrow}");
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__menu-items")
      .eq(0)
      .find(".a-combobox__menu-item")
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
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__input")
      .eq(0)
      .click()
      .type("{downArrow}{enter}")
      .should("have.value", "Bread, Cereal, Rice, and Pasta");
  });

  it("has appropriate role attributes", () => {
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__input")
      .eq(0)
      .click();
    cy.get("#story--components-comboboxes--usage-1 .a-combobox__menu-items")
      .eq(0)
      .should("have.attr", "role", "listbox")
      .find(".a-combobox__menu-item")
      .first()
      .should("have.attr", "role", "option")
      .focus()
      .type("{esc}");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000);

    cy.get("#story--components-comboboxes--usage-1 .a-combobox__input")
      .first()
      .type("{downArrow}");

    cy.get("#story--components-comboboxes--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-combobox--usage-1");

    cy.get("#story--components-comboboxes--dusk-1 .a-combobox__input")
      .first()
      .type("{downArrow}");

    cy.get("#story--components-comboboxes--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-combobox--dusk-1");
  });
});
