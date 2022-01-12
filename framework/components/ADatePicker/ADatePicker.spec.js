const rangeSelector = "#range + .playground .a-date-picker";
const initialRangeSelector = "#initial-range-date + .playground .a-date-picker";

context("ADatePicker", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:3000/components/date-picker");
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

  it("selects the two outer bounds of a date range", () => {
    cy.get(`${rangeSelector} .a-date-picker__day`).eq(7).click();
    cy.get(`${rangeSelector} .a-date-picker__day`).eq(10).click();
    cy.get(`${rangeSelector} .a-date-picker__day.selected`).contains("2");
    cy.get(`${rangeSelector} .a-date-picker__day.selected`).contains("5");
  });

  it("selects inner bounds between a date range", () => {
    cy.get(`${rangeSelector} .a-date-picker__day`).eq(7).click();
    cy.get(`${rangeSelector} .a-date-picker__day`).eq(10).click();
    cy.get(`${rangeSelector} .a-date-picker__day.between`).eq(0).contains("3");
    cy.get(`${rangeSelector} .a-date-picker__day.between`).eq(1).contains("4");
  });

  it("selects a range between two months", () => {
    cy.get(`${rangeSelector} .a-date-picker__day`).eq(7).click();
    cy.get("#range + .playground .a-date-picker__next").click();
    cy.get(`${rangeSelector} .a-date-picker__day`).eq(10).click();
    cy.get(`${rangeSelector} .a-date-picker__day.between:not(.disabled)`).should("have.length", 8);
    cy.get("#range + .playground .a-date-picker__prev").click();
    cy.get(`${rangeSelector} .a-date-picker__day.between:not(.disabled)`).should("have.length", 29);
  });

  it("displays the upper range bound when an initial range is supplied", () => {
    cy.get(initialRangeSelector).contains("April");
    cy.get(`${initialRangeSelector} .a-date-picker__day.selected`).contains("5");
  });
});