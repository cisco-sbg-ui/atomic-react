context("ATextInput", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=extend-input-base--usage-1&viewMode=docs"
    );
  });

  it("supports clearable", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get("#story--extend-input-base--usage-1")
      .find(".a-input-base__clear")
      .eq(0)
      .should("have.attr", "role", "button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("cleared");
      })
      .type("{enter}")
      .then(() => {
        expect(stub.getCall(1)).to.be.calledWith("cleared");
      })
      .type(" ")
      .then(() => {
        expect(stub.getCall(2)).to.be.calledWith("cleared");
      })
      .tab()
      .tab();

    cy.get("#story--extend-input-base--usage-1")
      .find(".a-input-base--warning .a-input-base__clear")
      .then(($el) => {
        Cypress.dom.isFocused($el);
      });
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--extend-input-base--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-input-base--usage-1");

    cy.get("#story--extend-input-base--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-input-base--dusk-1");
  });
});
