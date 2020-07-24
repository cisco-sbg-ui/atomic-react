context("ADataTable", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-data-tables--usage-1&viewMode=docs"
    );
  });

  it("sorts normally", () => {
    cy.get("#story--components-data-tables--usage-1 td").eq(0).contains(11.1);
    cy.get("#story--components-data-tables--usage-1 th").eq(0).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(0).contains(8.9);
    cy.get("#story--components-data-tables--usage-1 th").eq(0).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(0).contains(11.1);
    cy.get("#story--components-data-tables--usage-1 th .a-icon")
      .eq(0)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get("#story--components-data-tables--usage-1 th").eq(0).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(0).contains(11.1);
  });

  it("allows disabled sort", () => {
    cy.get("#story--components-data-tables--usage-1 td").eq(1).contains(526);
    cy.get("#story--components-data-tables--usage-1 th").eq(1).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(1).contains(526);
    cy.get("#story--components-data-tables--usage-1 th").eq(1).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(1).contains(526);
    cy.get("#story--components-data-tables--usage-1 th .a-icon")
      .eq(1)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get("#story--components-data-tables--usage-1 th").eq(1).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(1).contains(526);
  });

  it("allows custom sort", () => {
    cy.get("#story--components-data-tables--usage-1 td")
      .eq(2)
      .contains("aardvark");
    cy.get("#story--components-data-tables--usage-1 th").eq(2).click();
    cy.get("#story--components-data-tables--usage-1 td")
      .eq(2)
      .contains("aardvark");
    cy.get("#story--components-data-tables--usage-1 th").eq(2).click();
    cy.get("#story--components-data-tables--usage-1 td")
      .eq(2)
      .contains("Zanzibar");
    cy.get("#story--components-data-tables--usage-1 th .a-icon")
      .eq(2)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get("#story--components-data-tables--usage-1 th").eq(2).click();
    cy.get("#story--components-data-tables--usage-1 td")
      .eq(2)
      .contains("aardvark");
  });

  it("aligns correctly", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-data-tables--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-data-table--usage-1");
  });
});
