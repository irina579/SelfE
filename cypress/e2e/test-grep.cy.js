it("Smoke test [smoke]", { tags: ['smoke'] }, () => {
    cy.log("✅ SMOKE");
  });
  
  it("Regression test [regression]", { tags: ['regression'] }, () => {
    cy.log("⚠️ REGRESSION");
  });
  