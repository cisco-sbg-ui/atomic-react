context("ADataTable", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/data-table");
  });

  it("sorts normally", () => {
    cy.get("#usage + .playground td").eq(0).contains(11.1);
    cy.get("#usage + .playground th").eq(0).click();
    cy.get("#usage + .playground td").eq(0).contains(8.9);
    cy.get("#usage + .playground th").eq(0).click();
    cy.get("#usage + .playground td").eq(0).contains(11.1);
    cy.get("#usage + .playground th .a-icon")
      .eq(0)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get("#usage + .playground th").eq(0).click();
    cy.get("#usage + .playground td").eq(0).contains(11.1);
  });

  it("allows disabled sort", () => {
    cy.get("#usage + .playground td").eq(1).contains(526);
    cy.get("#usage + .playground th").eq(1).click();
    cy.get("#usage + .playground td").eq(1).contains(526);
    cy.get("#usage + .playground th").eq(1).click();
    cy.get("#usage + .playground td").eq(1).contains(526);
    cy.get("#usage + .playground th .a-icon")
      .eq(1)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get("#usage + .playground th").eq(1).click();
    cy.get("#usage + .playground td").eq(1).contains(526);
  });

  it("allows custom sort", () => {
    cy.get("#usage + .playground td").eq(2).contains("aardvark");
    cy.get("#usage + .playground th").eq(2).click();
    cy.get("#usage + .playground td").eq(2).contains("aardvark");
    cy.get("#usage + .playground th").eq(2).click();
    cy.get("#usage + .playground td").eq(2).contains("Zanzibar");
    cy.get("#usage + .playground th .a-icon")
      .eq(2)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get("#usage + .playground th").eq(2).click();
    cy.get("#usage + .playground td").eq(2).contains("aardvark");
  });

  it("aligns correctly", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").toMatchImageSnapshot();
  });
});
