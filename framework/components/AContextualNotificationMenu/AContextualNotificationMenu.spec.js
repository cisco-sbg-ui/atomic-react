context("AContextualNotificationMenu", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/components/contextual-notification-menu"
    );
  });

  it("has working keyboard events", () => {
    cy.get(".a-contextual-notification-menu").should("not.exist");
    cy.get("#usage + .playground .a-text-input__input").eq(0).type("mm");
    cy.get(".a-contextual-notification-menu")
      .eq(0)
      .should("be.visible")
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .type("{esc}");
    cy.get(".a-contextual-notification-menu").should("not.exist");
    cy.get("#usage + .playground .a-button")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });

    // TODO: test tab key once cypress supports it.
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#variants + .playground .a-button").eq(0).click({force: true});
    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();

    cy.get("#variants + .playground").click("bottomLeft", {
      force: true
    });

    cy.get("#variants + .playground .a-button").eq(1).click({force: true});
    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();

    cy.get("#variants + .playground").click("bottomLeft", {
      force: true
    });

    cy.get("#variants + .playground .a-button").eq(2).click({force: true});
    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();

    cy.get("#variants + .playground").click("bottomLeft", {
      force: true
    });

    cy.get("#variants + .playground .a-button").eq(3).click({force: true});
    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get("#variants + .playground").click("bottomLeft", {
      force: true
    });

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#variants + .playground .a-button").eq(0).click({force: true});
    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get("#variants + .playground").click("bottomLeft", {
      force: true
    });

    cy.get("#variants + .playground .a-button").eq(1).click({force: true});
    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get("#variants + .playground").click("bottomLeft", {
      force: true
    });

    cy.get("#variants + .playground .a-button").eq(2).click({force: true});
    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get("#variants + .playground").click("bottomLeft", {
      force: true
    });

    cy.get("#variants + .playground .a-button").eq(3).click({force: true});
    cy.get(
      "#variants + .playground .playground__preview"
    ).toMatchImageSnapshot();
    cy.get("#variants + .playground").click("bottomLeft", {
      force: true
    });
  });
});
