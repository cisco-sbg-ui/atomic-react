context("AAccordion", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-accordions--usage-1&viewMode=docs"
    );
  });

  it("has appropriate default state", () => {
    cy.get("#story--components-accordions--usage-1 .a-accordion__card")
      .eq(0)
      .should("not.have.attr", "aria-expanded");
    cy.get("#story--components-accordions--usage-1 .a-accordion__card")
      .eq(1)
      .should("have.attr", "aria-expanded", "true");
    cy.get("#story--components-accordions--usage-1 .a-accordion__card")
      .eq(2)
      .should("have.attr", "aria-expanded", "false");
    cy.get("#story--components-accordions--usage-1 .a-accordion__card")
      .eq(3)
      .should("have.attr", "aria-expanded", "true");
  });

  it("tabs appropriately", () => {
    cy.get("#story--components-accordions--usage-1 .a-button")
      .eq(0)
      .focus()
      .tab();
    cy.get("#story--components-accordions--usage-1 .a-accordion__link")
      .eq(1)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .tab();
    cy.get("#story--components-accordions--usage-1 .a-accordion__link")
      .eq(2)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .tab();
    cy.get("#story--components-accordions--usage-1 .a-button")
      .eq(1)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("supports alternative icons", () => {
    cy.get("#story--components-accordions--icons-1 .a-accordion__link .a-icon")
      .eq(1)
      .should("have.attr", "aria-label", "subtract icon")
      .click()
      .should("have.attr", "aria-label", "add icon");
  });

  it("expands/collapses appropriately", () => {
    cy.get("#story--components-accordions--usage-1 .a-accordion__card")
      .eq(1)
      .should("have.attr", "aria-expanded", "true")
      .find(".a-accordion__link")
      .should("have.attr", "role", "button")
      .click();
    cy.get("#story--components-accordions--usage-1 .a-accordion__card")
      .eq(1)
      .should("have.attr", "aria-expanded", "false")
      .find(".a-accordion__link")
      .type("{enter}");
    cy.get("#story--components-accordions--usage-1 .a-accordion__card")
      .eq(1)
      .find(".a-accordion__link")
      .type(" ");
    cy.get("#story--components-accordions--usage-1 .a-accordion__card")
      .eq(1)
      .find(".a-accordion__link")
      .type(" ");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-accordions--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-accordion--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-accordions--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-accordion--dusk-1");
  });
});
