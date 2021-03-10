"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-ts-normalization:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ packageManager: "npm" });
  });

  it("creates files", () => {
    assert.file([
      ".editorconfig",
      ".eslintignore",
      ".eslintrc.js",
      ".prettierrc.js",
      "tsconfig.json"
    ]);
  });
});
