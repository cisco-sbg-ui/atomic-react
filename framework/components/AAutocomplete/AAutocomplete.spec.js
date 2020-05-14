import giResponse from "./algolia.gi.fixture.json";

context("AAutocomplete", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-autocompletes--usage-1&viewMode=docs"
    );
  });

  it("has a label that works", () => {
    cy.get("#story--components-autocompletes--usage-1 .a-input-base__label")
      .eq(0)
      .click()
      .then(($el) => {
        const labelFor = $el.attr("for");
        cy.get(
          "#story--components-autocompletes--usage-1 .a-autocomplete__input"
        )
          .eq(0)
          .then(($el2) => {
            Cypress.dom.isFocused($el2);
            cy.wrap($el2).should("have.attr", "id", labelFor);
          });
      });
  });

  it("opens and closes appropriately", () => {
    cy.server();
    cy.route("post", "https://nut7b5fgkt-dsn.algolia.net/**", giResponse).as(
      "algolia"
    );

    cy.get(
      "#story--components-autocompletes--usage-1 .a-autocomplete__menu-items"
    )
      .eq(0)
      .should("not.be.visible");
    cy.get("#story--components-autocompletes--usage-1 .a-autocomplete__input")
      .eq(0)
      .type("gi")
      .wait("@algolia");
    cy.get(
      "#story--components-autocompletes--usage-1 .a-autocomplete__menu-items"
    )
      .eq(0)
      .should("be.visible")
      .prev()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{downArrow}");
    cy.get(
      "#story--components-autocompletes--usage-1 .a-autocomplete__menu-item"
    )
      .eq(0)
      .type("{esc}");
    cy.get(
      "#story--components-autocompletes--usage-1 .a-autocomplete__menu-items"
    )
      .eq(0)
      .should("not.be.visible");
  });

  it("tabs appropriately", () => {
    cy.get("#story--components-autocompletes--usage-1 .a-autocomplete__input")
      .eq(0)
      .type("{downArrow}")
      .tab();
    cy.get(
      "#story--components-autocompletes--usage-1 .a-autocomplete__menu-items"
    )
      .eq(0)
      .find(".a-autocomplete__menu-item")
      .first()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .tab();
    cy.get("#story--components-autocompletes--usage-1 .a-input-base__clear")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("arrow-keys menus appropriately", () => {
    cy.get("#story--components-autocompletes--usage-1 .a-autocomplete__input")
      .eq(0)
      .type("{downArrow}")
      .type("{downArrow}");
    cy.get(
      "#story--components-autocompletes--usage-1 .a-autocomplete__menu-items"
    )
      .eq(0)
      .find(".a-autocomplete__menu-item")
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

    cy.get("#story--components-autocompletes--usage-1 .a-autocomplete__input")
      .eq(0)
      .type("{upArrow}");
    cy.get(
      "#story--components-autocompletes--usage-1 .a-autocomplete__menu-items"
    )
      .eq(0)
      .find(".a-autocomplete__menu-item")
      .last()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .focus()
      .type("{upArrow}")
      .prev()
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .focus()
      .type("{esc}");
  });

  it("has appropriate role attributes", () => {
    cy.get("#story--components-autocompletes--usage-1 .a-autocomplete__input")
      .eq(0)
      .type("{downArrow}");
    cy.get(
      "#story--components-autocompletes--usage-1 .a-autocomplete__menu-items"
    )
      .eq(0)
      .should("have.attr", "role", "listbox")
      .find(".a-autocomplete__menu-item")
      .first()
      .should("have.attr", "role", "option")
      .focus()
      .type("{esc}");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000);

    cy.get("#story--components-autocompletes--usage-1 .a-autocomplete__input")
      .first()
      .type("{downArrow}");

    cy.get("#story--components-autocompletes--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-autocomplete--usage-1");

    cy.get("#story--components-autocompletes--states-1 .a-autocomplete__input")
      .first()
      .type("{downArrow}");

    cy.get("#story--components-autocompletes--states-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-autocomplete--states-1");

    cy.get("#story--components-autocompletes--dusk-1 .a-autocomplete__input")
      .first()
      .type("{downArrow}");

    cy.get("#story--components-autocompletes--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-autocomplete--dusk-1");
  });
});
