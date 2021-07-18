context("ADatePicker", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/date-picker");
  });

  it("navigates properly", () => {
    cy.get("#usage + .playground .a-date-picker").contains("January");
    cy.get("#usage + .playground .a-date-picker__day").eq(5).contains("1");
    cy.get("#usage + .playground .a-date-picker__next").click();
    cy.get("#usage + .playground .a-date-picker").contains("February");
    cy.get("#usage + .playground .a-date-picker__prev").click();
    cy.get("#usage + .playground .a-date-picker").contains("January");
    cy.get("#usage + .playground .a-date-picker__day.selected").contains("14");
    cy.get("#usage + .playground .a-date-picker__day").eq(7).click();
    cy.get("#usage + .playground .a-date-picker__day").contains("3");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "DatePicker 1"
    );

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .playground__preview").compareSnapshot(
      "DatePicker 2"
    );
  });
});
