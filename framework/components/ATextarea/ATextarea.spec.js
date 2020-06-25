import LoremIpsum from "../../utils/lorem-ipsum";

context("ATextarea", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:8081/iframe.html?id=components-textareas--usage-1&viewMode=docs"
    );
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;

    cy.get("#story--components-textareas--usage-1")
      .parent()
      .parent()
      .matchImageSnapshot("a-textarea--usage-1");

    cy.get(".a-button").eq(1).click();

    cy.get("#story--components-textareas--usage-1")
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

  it("validates", () => {
    cy.get("#story--components-textareas--rules-1 .a-textarea__field")
      .eq(0)
      .type("123456789012");
    cy.get("#story--components-textareas--rules-1").click("left");
    cy.get("#story--components-textareas--rules-1 .a-input-base__hint")
      .eq(0)
      .contains("Comments must be less than 10 characters");

    cy.get("#story--components-textareas--rules-1 .a-textarea__field")
      .eq(0)
      .clear();
    cy.get("#story--components-textareas--rules-1").click("left");
    cy.get("#story--components-textareas--rules-1 .a-input-base__hint")
      .eq(0)
      .contains("Comments is required");
  });
});
