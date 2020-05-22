context("APopover", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-popovers--position-1&viewMode=docs"
    );
  });

  it("handles onClose", () => {
    cy.get("#story--components-popovers--onclose-1 .a-button").click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get(".a-app .a-menu-base").first().click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get("#story--components-popovers--onclose-1 .a-button").click();
    cy.get(".a-app .a-menu-base").should("not.exist");

    cy.get("#story--components-popovers--onclose-1 .a-button").click();
    cy.get(".a-app .a-menu-base").should("exist");
    cy.get(
      "#story--components-popovers--onclose-1 .onclose-1__instruction"
    ).click();
    cy.get(".a-app .a-menu-base").should("not.exist");
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-popovers--position-1").scrollIntoView();
    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(0)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-0");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(1)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-1");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(2)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-2");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(3)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-3");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(4)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-4");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(5)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-5");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(6)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-6");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(7)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-7");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(8)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-8");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(9)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-9");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(10)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-10");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(11)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--position-11");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get(".a-button").eq(1).click();
    cy.get("#story--components-popovers--position-1").scrollIntoView();

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(0)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-0");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(1)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-1");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(2)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-2");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(3)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-3");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(4)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-4");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(5)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-5");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(6)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-6");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(7)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-7");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(8)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-8");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(9)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-9");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(10)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-10");
    cy.get(".a-popover .a-button").eq(0).click({force: true});

    cy.get("#story--components-popovers--position-1 .a-button")
      .eq(11)
      .then(($el) => {
        $el.closest("html").css("overflow-y", "hidden");
      })
      .click({force: true});
    cy.get("#story--components-popovers--position-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-popover--dusk-11");
    cy.get(".a-popover .a-button").eq(0).click({force: true});
  });
});
