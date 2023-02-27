describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const users = [
      {
        name: "Test User",
        username: "testuser",
        password: "testpassword",
      },
      {
        name: "Test User 2",
        username: "testuser2",
        password: "testpassword2",
      },
    ];

    for (let user of users) {
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    }

    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpassword");
      cy.get("#login-button").click();

      cy.contains("Test User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();

      cy.contains("Wrong username or password").and(
        "have.css",
        "color",
        "rgb(169, 68, 66)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "testpassword" });
    });

    it("A blog can be created", function () {
      cy.contains("new note").click();
      cy.get("#title").type("Test Blog");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("http://testurl.com");
      cy.get("#create-button").click();

      cy.contains("Test Blog");
      cy.contains("a new blog Test Blog added");
    });

    describe("and a several blogs exist", function () {
      beforeEach(function () {
        cy.login({ username: "testuser2", password: "testpassword2" });

        cy.createBlog({
          title: "Test Blog 1 (testuser2)",
          author: "Test Author 1",
          url: "http://testurl1.com",
          likes: 0,
        });

        cy.login({ username: "testuser", password: "testpassword" });

        cy.createBlog({
          title: "Test Blog 2",
          author: "Test Author 2",
          url: "http://testurl2.com",
          likes: 2,
        });

        cy.createBlog({
          title: "Test Blog 3",
          author: "Test Author 3",
          url: "http://testurl3.com",
          likes: 2,
        });
      });

      it("A blog can be liked", function () {
        cy.contains("Test Blog 2").parent().contains("view").click();
        cy.contains("Test Blog 2").parent().parent().as("testBlog2");

        cy.get("@testBlog2").contains("like").click();
        cy.get("@testBlog2").contains("likes 3");
      });

      it("A blog can be deleted", function () {
        cy.contains("Test Blog 2").parent().contains("view").click();
        cy.contains("Test Blog 2").parent().parent().as("testBlog2");

        cy.get("@testBlog2").contains("remove").click();
        cy.should("not.contain", "Test Blog 2");
      });

      it("Blog created by another user cannot be deleted", function () {
        cy.contains("Test Blog 1 (testuser2)")
          .parent()
          .contains("view")
          .click();
        cy.contains("Test Blog 1 (testuser2)")
          .parent()
          .parent()
          .as("testBlog1");

        cy.contains("Test User 2");
        cy.get("@testBlog1").contains("remove").should("not.exist");
      });

      it("Blogs are ordered by likes", function () {
        cy.contains("Test Blog 3").parent().contains("view").click();
        cy.contains("Test Blog 3").parent().parent().as("testBlog3");

        cy.get("@testBlog3").contains("like").click();
        cy.get("@testBlog3").contains("likes 3");

        cy.get(".blog").then((blogs) => {
          cy.wrap(blogs[0]).contains("Test Blog 3");
          cy.wrap(blogs[1]).contains("Test Blog 2");
          cy.wrap(blogs[2]).contains("Test Blog 1 (testuser2)");
        });
      });
    });
  });
});
