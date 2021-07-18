context("ASelect", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/select");
  });

  it("has a label that works", () => {
    cy.get("#usage + .playground .a-field-base__label")
      .eq(0)
      .click()
      .then(($el) => {
        const labelId = $el.attr("id");
        cy.get("#usage + .playground .a-select__selection")
          .eq(0)
          .then(($el2) => {
            Cypress.dom.isFocused($el2);
            cy.wrap($el2).should("have.attr", "aria-labelledby", labelId);
          });
      });
  });

  it("opens and closes appropriately", () => {
    cy.get("#usage + .playground .a-select__menu-items")
      .eq(0)
      .should("not.be.visible");
    cy.get("#usage + .playground .a-select__selection").eq(0).click();
    cy.get("#usage + .playground .a-select__menu-items")
      .eq(0)
      .should("be.visible")
      .type("{esc}")
      .should("not.be.visible")
      .prev()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type(" ");
  });

  it("tabs appropriately", () => {
    cy.get("#usage + .playground .a-select__selection").eq(0).focus().tab();
    cy.get("#usage + .playground .a-select__selection")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });

    cy.get("#usage + .playground .a-select__selection").eq(0).click().tab();
    cy.get("#usage + .playground .a-select__menu-items")
      .eq(0)
      .should("not.be.visible");
    cy.get("#usage + .playground .a-select__selection")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("arrow-keys menus appropriately", () => {
    cy.get("#usage + .playground .a-select__selection")
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

    cy.get("#usage + .playground .a-select__selection")
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
    cy.get("#usage + .playground .a-select__selection")
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
    cy.get("#usage + .playground .a-select__selection").eq(0).click();
    cy.get("#usage + .playground .a-select__menu-item")
      .eq(0)
      .should("have.class", "a-select__menu-item--selected")
      .type("{esc}");
  });

  it("has appropriate role attributes", () => {
    cy.get("#usage + .playground .a-select__selection")
      .eq(0)
      .click()
      .next()
      .should("have.attr", "role", "listbox")
      .find(".a-select__menu-item")
      .first()
      .should("have.attr", "role", "option")
      .type("{esc}");
  });

  it("validates on blur", () => {
    cy.get("#validation + .playground .a-select__selection")
      .eq(0)
      .tab()
      .tab({shift: true})
      .tab();
    cy.get("#validation + .playground .a-field-base__hint")
      .eq(0)
      .contains("Role is required");
  });

  it("validates", () => {
    cy.get("#validation + .playground .a-select__selection").eq(0).click();
    cy.get("#validation + .playground .a-select__menu-item").eq(0).click();
    cy.get("#validation + .playground .a-field-base__hint")
      .eq(0)
      .contains("Role is required");

    cy.get("#validation + .playground .a-select__selection").eq(0).click();
    cy.get("#validation + .playground .a-select__menu-item").eq(3).click();
    cy.get("#validation + .playground .a-field-base__hint")
      .eq(0)
      .contains("Role is set to Admin");

    cy.get("#validation + .playground .a-select__selection").eq(0).click();
    cy.get("#validation + .playground .a-select__menu-item").eq(1).click();
    cy.get("#validation + .playground .a-field-base__hint").should("not.exist");
  });

  it("supports dynamic items", () => {
    cy.get("#alternate-usage + .playground .a-select__selection").contains(
      "Bbb"
    );
    cy.get("#alternate-usage + .playground .a-button").click();
    cy.get("#alternate-usage + .playground .a-select__selection").contains(
      "333"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#states + .playground .a-select__selection").first().click();

    cy.get("#states + .playground .playground__preview").compareSnapshot(
      "Select 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#states + .playground .a-select__selection")
      .first()
      .focus()
      .type("{downArrow}")
      .click();

    cy.get("#states + .playground .playground__preview").compareSnapshot(
      "Select 2"
    );
  });
});
