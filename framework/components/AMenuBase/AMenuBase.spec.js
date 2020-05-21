context("AMenuBase", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=extend-menu-base--position-1&viewMode=docs"
    );
  });

  it("handles onClose", () => {
    cy.get("#story--extend-menu-base--onclose-1 .a-button").click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get(".a-app .a-menu-base").first().click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get("#story--extend-menu-base--onclose-1 .a-button").click();
    cy.get(".a-app .a-menu-base").should("not.exist");

    cy.get("#story--extend-menu-base--onclose-1 .a-button").click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get(
      "#story--extend-menu-base--onclose-1 .onclose-1__instruction"
    ).click();
    cy.get(".a-app .a-menu-base").should("not.exist");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(0)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(1)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(2)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(3)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(4)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(5)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(6)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(7)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(8)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(9)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(10)
      .click({force: true});
    cy.get("#story--extend-menu-base--position-1 .a-button")
      .eq(11)
      .click({force: true});

    cy.get("#story--extend-menu-base--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-menu-base--position-1");

    cy.get("#story--extend-menu-base--edge-1 .a-button")
      .eq(0)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click();
    cy.get("#story--extend-menu-base--edge-1 .a-button").eq(1).click();

    cy.get("#story--extend-menu-base--edge-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-menu-base--edge-1");

    cy.get("#story--extend-menu-base--pointers-1 .a-button")
      .eq(0)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(1).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(2).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(3).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(4).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(5).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(6).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(7).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(8).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(9).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(10).click();
    cy.get("#story--extend-menu-base--pointers-1 .a-button").eq(11).click();

    cy.get("#story--extend-menu-base--pointers-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-menu-base--pointers-1");
  });
});
