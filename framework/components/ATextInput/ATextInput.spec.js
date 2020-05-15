context("ATextInput", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-text-inputs--usage-1&viewMode=docs"
    );
  });

  it("has a working auto-focus", () => {
    cy.get("#story--components-text-inputs--usage-1 .a-text-input__input").then(
      ($el) => {
        Cypress.dom.isFocused($el);
      }
    );
  });

  it("is clearable", () => {
    cy.get("#story--components-text-inputs--usage-1 .a-text-input__input").then(
      ($el) => {
        const value = $el.attr("value");
        expect(value.length).to.be.gt(0);
        cy.get(
          "#story--components-text-inputs--usage-1 .a-input-base__clear"
        ).click();
        cy.get(
          "#story--components-text-inputs--usage-1 .a-text-input__input"
        ).should("have.value", "");
      }
    );
  });

  it("has a working non-interactable prepend icon", () => {
    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__prepend-icon")
      .eq(3)
      .should("not.have.attr", "role", "button");
  });

  it("has a working non-interactable append icon", () => {
    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__append-icon")
      .eq(3)
      .should("not.have.attr", "role", "button");
  });

  it("has a working interactable prepend icon", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__prepend-icon")
      .eq(0)
      .should("have.attr", "role", "button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Cisco Systems!");
      })
      .type("{enter}")
      .then(() => {
        expect(stub.getCall(1)).to.be.calledWith("Cisco Systems!");
      });
  });

  it("has a working interactable append icon", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__append-icon")
      .eq(0)
      .should("have.attr", "role", "button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Information!");
      })
      .type("{enter}")
      .then(() => {
        expect(stub.getCall(1)).to.be.calledWith("Information!");
      });
  });

  it("tabs appropriately and focuses", () => {
    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__input")
      .eq(0)
      .focus()
      .tab();

    // Prepended icon with click handler is tab-focusable.
    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__prepend-icon")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .tab()
      .tab();

    // Appended icon with click handler is tab-focusable.
    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__append-icon")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .tab()
      .tab()
      .tab()
      .tab();

    // Cycle through disabled (not tab-focusable), readonly, to second warning example
    // (second warning example has prepended and appended icons without click handlers).
    // Prepended icon without click handler is not tab-focusable.
    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__input")
      .eq(7)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .tab();

    // Appended icon without click handler is not tab-focusable.
    cy.get("#story--components-text-inputs--validation-1")
      .find(".a-text-input__input")
      .eq(8)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("accepts input", () => {
    cy.get("#story--components-text-inputs--usage-1")
      .find(".a-text-input__input")
      .clear()
      .type("elephant")
      .should("have.value", "elephant")
      .blur();
  });

  it("works as a number type", () => {
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__input")
      .eq(0)
      .should("have.value", "1");
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__spinner__up")
      .eq(0)
      .click();
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__input")
      .eq(0)
      .should("have.value", "2");
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__spinner__down")
      .eq(0)
      .click();
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__input")
      .eq(0)
      .should("have.value", "1");

    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__input")
      .eq(1)
      .should("have.value", "");
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__spinner__up")
      .eq(1)
      .click();
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__input")
      .eq(1)
      .should("have.value", "1");
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-input-base__clear")
      .eq(0)
      .click();
    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__input")
      .eq(1)
      .should("have.value", "");

    cy.get("#story--components-text-inputs--numeric-1")
      .find(".a-text-input__spinner")
      .should("have.length", 2);
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-text-inputs--validation-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-text-input--validation-1");

    cy.get("#story--components-text-inputs--numeric-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-text-input--numeric-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-text-inputs--validation-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-text-input--dusk-1");
  });
});
