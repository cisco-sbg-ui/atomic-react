context("APagination", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-paginations--usage-1&viewMode=docs"
    );
  });

  it("has working basic pagination", () => {
    cy.get("#story--components-paginations--usage-1").contains("Page 1");
    cy.get(
      "#story--components-paginations--usage-1 .a-pagination__previous"
    ).should("have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-1 .a-pagination__next"
    ).click();
    cy.get(
      "#story--components-paginations--usage-1 .a-pagination__previous"
    ).should("not.have.attr", "disabled");
    cy.get("#story--components-paginations--usage-1").contains("Page 2");
    cy.get(
      "#story--components-paginations--usage-1 .a-pagination__next"
    ).click();
    cy.get("#story--components-paginations--usage-1").contains("Page 3");
    cy.get(
      "#story--components-paginations--usage-1 .a-pagination__next"
    ).should("have.attr", "disabled");
  });

  it("has working pagination with total", () => {
    cy.get("#story--components-paginations--usage-2").contains("Page 1");
    cy.get(
      "#story--components-paginations--usage-2 .a-pagination__previous"
    ).should("have.attr", "disabled");
    cy.get("#story--components-paginations--usage-2 .a-button-group .a-button")
      .eq(0)
      .should("have.class", "a-button--state-selected");
    cy.get(
      "#story--components-paginations--usage-2 .a-pagination__next"
    ).click();
    cy.get("#story--components-paginations--usage-2").contains("Page 2");
    cy.get(
      "#story--components-paginations--usage-2 .a-pagination__previous"
    ).should("not.have.attr", "disabled");
    cy.get("#story--components-paginations--usage-2 .a-button-group .a-button")
      .eq(1)
      .should("have.class", "a-button--state-selected");
    cy.get("#story--components-paginations--usage-2 .a-pagination__next")
      .click()
      .click()
      .click()
      .click();
    cy.get("#story--components-paginations--usage-2 .a-button-group").should(
      "have.length",
      2
    );
    cy.get(
      "#story--components-paginations--usage-2 .a-pagination__next"
    ).click();
    cy.get("#story--components-paginations--usage-2 .a-button-group").should(
      "have.length",
      3
    );
    cy.get("#story--components-paginations--usage-2 .a-button-group .a-button")
      .last()
      .click();
    cy.get("#story--components-paginations--usage-2 .a-button-group .a-button")
      .last()
      .should("have.class", "a-button--state-selected");
    cy.get("#story--components-paginations--usage-2 .a-button-group").should(
      "have.length",
      2
    );
    cy.get(
      "#story--components-paginations--usage-2 .a-pagination__next"
    ).should("have.attr", "disabled");

    cy.get(
      "#story--components-paginations--usage-2 .a-pagination__previous"
    ).click();
    cy.get(
      "#story--components-paginations--usage-2 .a-button-group .a-button--state-selected"
    ).contains("14");
  });

  it("has working pagination with total and resultsPerPage", () => {
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__page-selection .a-text-input__input"
    ).should("have.value", "1");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__results"
    ).contains("1-5 of 145");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__first"
    ).should("have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__previous"
    ).should("have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__next"
    ).click();

    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__page-selection .a-text-input__input"
    ).should("have.value", "2");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__results"
    ).contains("6-10 of 145");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__first"
    ).should("not.have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__previous"
    ).should("not.have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__last"
    ).click();

    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__page-selection .a-text-input__input"
    ).should("have.value", "29");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__results"
    ).contains("141-145 of 145");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__last"
    ).should("have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__next"
    ).should("have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__previous"
    ).click();

    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__page-selection .a-text-input__input"
    ).should("have.value", "28");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__results"
    ).contains("136-140 of 145");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__last"
    ).should("not.have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__next"
    ).should("not.have.attr", "disabled");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__page-selection .a-text-input__input"
    ).type("{backspace}{backspace}5{enter}");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__results"
    ).contains("21-25 of 145");

    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__results-per-page .a-text-input__input"
    ).type("{backspace}{backspace}50{enter}");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__page-selection .a-text-input__input"
    ).should("have.value", "1");
    cy.get(
      "#story--components-paginations--usage-3 .a-pagination__results"
    ).contains("1-50 of 145");
  });
});
