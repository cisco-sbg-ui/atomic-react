context("ATabs", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/tab");
  });

  it("tabs appropriately", () => {
    cy.get("#uncontrolled-mode + .playground .a-tab-group__tab")
      .eq(0)
      .focus()
      .tab();
    cy.get("#uncontrolled-mode + .playground .a-tab-group__tab")
      .eq(1)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("has appropriate roles", () => {
    cy.get("#uncontrolled-mode + .playground .a-tab-group")
      .eq(0)
      .should("have.attr", "role", "tablist");
    cy.get("#uncontrolled-mode + .playground .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "role", "tab")
      .should("have.attr", "aria-selected", "false");
    cy.get("#uncontrolled-mode + .playground .a-tab-group__tab")
      .eq(2)
      .should("have.attr", "role", "tab")
      .should("have.attr", "aria-selected", "true");
  });

  it("controlled selects/deselects appropriately", () => {
    cy.get("#controlled-mode + .playground .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "aria-selected", "false")
      .click()
      .should("have.attr", "aria-selected", "true");
    cy.get("#controlled-mode + .playground .a-tab-group__tab")
      .eq(2)
      .should("have.attr", "aria-selected", "false")
      .type("{enter}")
      .should("have.attr", "aria-selected", "true");
    cy.get("#controlled-mode + .playground .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "aria-selected", "false");
  });

  it("uncontrolled selects/deselects appropriately", () => {
    cy.get("#uncontrolled-mode + .playground .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "aria-selected", "false")
      .click()
      .should("have.attr", "aria-selected", "true");
    cy.get("#uncontrolled-mode + .playground .a-tab-group__tab")
      .eq(2)
      .should("have.attr", "aria-selected", "false")
      .type("{enter}")
      .should("have.attr", "aria-selected", "true");
    cy.get("#uncontrolled-mode + .playground .a-tab-group__tab")
      .eq(0)
      .should("have.attr", "aria-selected", "false");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get(
      "#uncontrolled-mode + .playground .playground__preview"
    ).toMatchImageSnapshot();

    cy.get("#tall + .playground .playground__preview").toMatchImageSnapshot();

    cy.get(
      "#oversized + .playground .playground__preview"
    ).toMatchImageSnapshot();

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#tall + .playground .playground__preview").toMatchImageSnapshot();

    cy.get(
      "#oversized + .playground .playground__preview"
    ).toMatchImageSnapshot();
  });
});
