context("AFeatureDiscovery", () => {
  before(() => {
    cy.visitInLightTheme(
      "http://localhost:3000/components/featurediscovery#install"
    );
  });

  beforeEach(() => cy.scrollTo("top"))

  it("Skip Tour closes the tour", () => {
    cy.get("#usage + .playground .a-button").eq(0).click();
    cy.get(".a-app .a-dialog")
      .eq(0)
      .then(($el) => {
        Cypress.dom.isFocused($el);
      })
      .should("have.attr", "role", "document");
    cy.findByText("Skip Tour").click();
    cy.get(".a-app .a-dialog").should("not.exist");
  });

  it("Next moves tour to next step", () => {
    cy.get("#usage + .playground .a-button").eq(0).click();
    cy.findByText("Next").click();
    cy.get(".a-app .a-popover").should("exist");
    cy.get(".a-menu-base--right-top").should("exist");
    cy.findByText("Next").click({force: true});
    cy.get(".a-menu-base--bottom").should("exist");
    cy.findByText("Next").click({force: true});
    cy.get(".a-menu-base--top").should("exist");
    cy.findByText("Close").click({force: true});
  });

  it("Esc calls onClose", () => {
    cy.get("#usage + .playground .a-button").eq(0).click();
    cy.get(".a-app .a-dialog").should("exist");
    cy.get("body").type("{esc}");
    cy.get(".a-app .a-dialog").should("not.exist");
  });

  it("custom tooltip component", () => {
    cy.get("#custom-tooltip-component + .playground .a-button").eq(0).click();
    cy.findByText("Next").click();
    cy.get(".a-app .a-popover").should("exist");
    cy.get(".a-menu-base--right-top").should("exist");
    cy.findByText("Next").click({force: true});
    cy.get(".a-menu-base--bottom").should("exist");
    cy.findByText("Next").click({force: true});
    cy.get(".a-menu-base--top").should("exist");
    cy.findByText("Close").click({force: true});
  });

  it("scrolling component", () => {
    cy.get("#custom-scrolling-example + .playground .a-button").eq(0).click();
    cy.get(".a-app #target-1").then($el => $el[0].getBoundingClientRect()).then(targetDim => {
      cy.get(".a-feature-discovery-backdrop>div").then($el => $el[0].getBoundingClientRect())
      .then(highlightDim => {
        expect(highlightDim.x).to.gte(targetDim.x - 10);
        expect(highlightDim.left).to.gte(targetDim.left - 10);
      })
    });
    cy.findByText("Next").click();
    cy.get(".a-app .target-2").then($el => $el[0].getBoundingClientRect()).then(targetDim => {
      cy.get(".a-feature-discovery-backdrop>div").then($el => $el[0].getBoundingClientRect())
      .then(highlightDim => {
        expect(highlightDim.x).to.gte(targetDim.x - 10);
        expect(highlightDim.left).to.gte(targetDim.left - 10);
      })
    });
    cy.get(".a-app .a-popover .a-button--tertiary-alt").eq(0).click({force: true});
  });

  it("supports themes", () => {
    if (Cypress.env("snapshots") === "off") return;
    
    cy.get("#usage + .playground .a-button").eq(0).click();
    cy.findByText("Next").click({force: true});
    cy.waitUntil(() => cy
    .window()
    .then(window => window.scrollY === 0));
    cy.get(".a-app .a-popover").should("be.visible");
    cy.compareSnapshot(
      "Feature Discovery 1", {
        capture: 'viewport'
      }
    );
    cy.get(".a-app .a-popover .a-button--tertiary-alt").eq(0).click({force: true});

    cy.get(".a-switch__box").eq(0).click();

    cy.get("#usage + .playground .a-button").eq(0).click();
    cy.findByText("Next").click({force: true});
    cy.waitUntil(() => cy
    .window()
    .then(window => window.scrollY === 0));
    cy.get(".a-app .a-popover").should("be.visible");
    cy.compareSnapshot(
      "Feature Discovery 2", {capture: 'viewport'}
    );
    cy.get(".a-app .a-popover .a-button--tertiary-alt").eq(0).click({force: true});
  });
});
