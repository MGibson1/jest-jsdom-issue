Repository displays a type coercion error with Node18 when using the jsdom test environment.

This issue is not caused by jsdom, as converting to `testEnvironment: 'node'` and injecting a `new JSDOM()` resolves the
issue.

I have followed the recommendation to override JSDOM in `package.json` to 22.1.0, but the issue persists.

The `main` branch displays the issue, while the `testEnvironment-node` branch shows that the issue is resolved by using
the `node` test environment and instantiating JSDOM manually.
