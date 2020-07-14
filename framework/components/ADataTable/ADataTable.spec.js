context("ADataTable", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-data-tables--usage-1&viewMode=docs"
    );
  });

  it("sorts", () => {
    cy.get("#story--components-data-tables--usage-1 td").eq(1).contains(526);
    cy.get("#story--components-data-tables--usage-1 th").eq(1).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(1).contains(475);
    cy.get("#story--components-data-tables--usage-1 th").eq(1).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(1).contains(611);
    cy.get("#story--components-data-tables--usage-1 th").eq(1).click();
    cy.get("#story--components-data-tables--usage-1 td").eq(1).contains(526);
  });
});
