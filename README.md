Repository displays a type coercion error with Node18 when using the jsdom test environment.

This issue is not caused by jsdom, as converting to `testEnvironment: 'node'` and injecting a `new JSDOM()` resolves the issue.

I have followed the recommendation to override JSDOM in `package.json` to 22.1.0, but the issue persists.
