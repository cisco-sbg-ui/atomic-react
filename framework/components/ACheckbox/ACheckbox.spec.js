context("ACheckbox", () => {
  before(() => {
    cy.visitInLightTheme("http://localhost:8081/components/checkbox");
  });

  // TODO: Test interactability

  // TODO: Test accessibility

  it("validates", () => {
    cy.get("#validation + .playground .a-checkbox__label").click();
    cy.get("#validation + .playground .a-hint").contains(
      "Your information is sold to third parties"
    );

    cy.get("#validation + .playground .a-checkbox__label").click();
    cy.get("#validation + .playground .a-hint").contains("Required");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#states + .playground .playground__preview").toMatchImageSnapshot();

    cy.get(
      "#label-wrap + .playground .playground__preview"
    ).toMatchImageSnapshot();

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#states + .playground .playground__preview").toMatchImageSnapshot();
  });
});
