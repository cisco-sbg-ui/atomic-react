context("ADataTable", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:3000/components/data-table");
  });

  const basicUsageSelector = `#basic + .playground`;

  it("sorts normally", () => {
    cy.get(`${basicUsageSelector} td`).eq(0).contains(11.1);
    cy.get(`${basicUsageSelector} th`).eq(0).click();
    cy.get(`${basicUsageSelector} td`).eq(0).contains(8.9);
    cy.get(`${basicUsageSelector} th`).eq(0).click();
    cy.get(`${basicUsageSelector} td`).eq(0).contains(11.1);
    cy.get(`${basicUsageSelector} th .a-icon`)
      .eq(0)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get(`${basicUsageSelector} th`).eq(0).click();
    cy.get(`${basicUsageSelector} td`).eq(0).contains(11.1);
  });

  it("allows disabled sort", () => {
    cy.get(`${basicUsageSelector} td`).eq(1).contains(526);
    cy.get(`${basicUsageSelector} th`).eq(1).click();
    cy.get(`${basicUsageSelector} td`).eq(1).contains(526);
    cy.get(`${basicUsageSelector} th`).eq(1).click();
    cy.get(`${basicUsageSelector} td`).eq(1).contains(526);
    cy.get(`${basicUsageSelector} th .a-icon`)
      .eq(1)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get(`${basicUsageSelector} th`).eq(1).click();
    cy.get(`${basicUsageSelector} td`).eq(1).contains(526);
  });

  it("allows custom sort", () => {
    cy.get(`${basicUsageSelector} td`).eq(2).contains("aardvark");
    cy.get(`${basicUsageSelector} th`).eq(2).click();
    cy.get(`${basicUsageSelector} td`).eq(2).contains("aardvark");
    cy.get(`${basicUsageSelector} th`).eq(2).click();
    cy.get(`${basicUsageSelector} td`).eq(2).contains("Zanzibar");
    cy.get(`${basicUsageSelector} th .a-icon`)
      .eq(2)
      .should("have.attr", "aria-label", "chevron-down icon");
    cy.get(`${basicUsageSelector} th`).eq(2).click();
    cy.get(`${basicUsageSelector} td`).eq(2).contains("aardvark");
  });

  it("aligns correctly", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get(`${basicUsageSelector} .playground__preview`).compareSnapshot(
      "DataTable 1"
    );
  });
});
