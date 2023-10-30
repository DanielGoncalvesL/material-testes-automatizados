// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: "yarn",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest",
  testRunner_comment:
    "Take a look at (missing 'homepage' URL in package.json) for information about the jest plugin.",
  coverageAnalysis: "perTest",
  mutate:
    [
      "src/**/*.ts",
      "!src/main/**",
      "!src/infra/db/postgres/migrations/**"
    ],
    commandRunner: { command: "yarn test" },
    htmlReporter: { fileName: "tests/coverage/mutation.html" },
    checkers: ["typescript"],
    tsconfigFile: "tsconfig.json",
};
export default config;
