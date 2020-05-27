context("AContextualNotificationMenu", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-contextual-notification-menus--variants-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).scrollIntoView();
    cy.get(
      "#story--components-contextual-notification-menus--variants-1 .a-button"
    )
      .eq(0)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-contextual-notification-menus--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification-menu--variants-info");
    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).click("bottomLeft", {force: true});

    cy.get(
      "#story--components-contextual-notification-menus--variants-1 .a-button"
    )
      .eq(1)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-contextual-notification-menus--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification-menu--variants-success");
    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).click("bottomLeft", {force: true});

    cy.get(
      "#story--components-contextual-notification-menus--variants-1 .a-button"
    )
      .eq(2)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-contextual-notification-menus--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification-menu--variants-warning");
    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).click("bottomLeft", {force: true});

    cy.get(
      "#story--components-contextual-notification-menus--variants-1 .a-button"
    )
      .eq(3)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-contextual-notification-menus--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification-menu--variants-danger");
    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).click("bottomLeft", {force: true});

    cy.get(".a-button").eq(1).click();

    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).scrollIntoView();
    cy.get(
      "#story--components-contextual-notification-menus--variants-1 .a-button"
    )
      .eq(0)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-contextual-notification-menus--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification-menu--dusk-info");
    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).click("bottomLeft", {force: true});

    cy.get(
      "#story--components-contextual-notification-menus--variants-1 .a-button"
    )
      .eq(1)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-contextual-notification-menus--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification-menu--dusk-success");
    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).click("bottomLeft", {force: true});

    cy.get(
      "#story--components-contextual-notification-menus--variants-1 .a-button"
    )
      .eq(2)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-contextual-notification-menus--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification-menu--dusk-warning");
    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).click("bottomLeft", {force: true});

    cy.get(
      "#story--components-contextual-notification-menus--variants-1 .a-button"
    )
      .eq(3)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-contextual-notification-menus--variants-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-contextual-notification-menu--dusk-danger");
    cy.get(
      "#story--components-contextual-notification-menus--variants-1"
    ).click("bottomLeft", {force: true});
  });
});
