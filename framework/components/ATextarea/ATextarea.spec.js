import LoremIpsum from "../../utils/lorem-ipsum";

context("ATextInput", () => {
  before(() => {
    cy.visit(
      "http://localhost:8081/iframe.html?id=components-textareas--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    // There isn't a way yet to tell if fonts are loaded, so wait 3 seconds.
    cy.wait(3000)
      .get("#story--components-textareas--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-textarea--usage-1");

    cy.get("#story--components-textareas--dusk-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-textarea--dusk-1");
  });

  it("auto-grows and auto-shrinks and toggles appropriately", () => {
    cy.get("#story--components-textareas--usage-1")
      .find(".a-textarea__field")
      .first()
      .then(($el) => {
        const originalHeight = parseInt(
          $el.css("height").replace(/([a-z])/g, "")
        );
        cy.wrap($el)
          .type(LoremIpsum)
          .then(($el2) => {
            const newHeight = parseInt(
              $el2.css("height").replace(/([a-z])/g, "")
            );

            expect(newHeight).to.be.gt(originalHeight);

            cy.wrap($el2)
              .clear()
              .then(($el3) => {
                const clearHeight = parseInt(
                  $el3.css("height").replace(/([a-z])/g, "")
                );

                expect(clearHeight).to.be.lt(newHeight);
              });
          });
      });

    cy.get("#story--components-textareas--usage-1").find(".a-checkbox").click();
    cy.get("#story--components-textareas--usage-1")
      .find(".a-textarea__field")
      .first()
      .should("have.attr", "style", "height: auto;");
  });
});
