# Dev Logger Pro 🛠️

A professional, environment-agnostic logger for JavaScript and Node.js projects. Clear, colorized output in browsers and tidy, human-friendly logs in Node — with simple runtime control over verbosity and a compact API.

---

## Quick overview

- **Package:** dev-logger-pro
- **Description:** Professional, configurable logging utility that works in Browsers, Node.js, and serverless platforms.
- **Author:** Mosaddik Billah
- **License:** MIT

---

## Features

- Simple, zero-ceremony API (`logger.init()`, `logger.log()`, `logger.info()`, `logger.warn()`, `logger.error()`).
- Automatic environment detection (Browser vs Node) with colored browser output.
- Global enable/disable via `debug` flag.
- Level filtering with `logLevel` (`verbose`, `warn`, `error`, `silent`).
- Optional `prefix` and function-name tracing for easier debugging.

---

## Installation

Install from npm:

```bash
npm install dev-logger-pro
```

Or use locally during development by importing the file directly.

---

## Quick Start

Import and configure the logger at the entry point of your application.

ES Modules example (recommended):

```js
import { logger } from "dev-logger-pro";

logger.init({
  debug: true, // set to false in production
  prefix: "🚀 [MyApp]", // custom prefix shown before messages
  logLevel: "verbose", // 'verbose' | 'warn' | 'error' | 'silent'
});

logger.log("App initialized", { port: 3000 }, "startServer");
logger.info("User signed in", { userId: 42 });
logger.warn("Cache miss", null, "getCache");
logger.error("Failed fetch", new Error("timeout"), "fetchData");
```

If you are testing locally without publishing to npm, import from the relative path:

```js
import { logger } from "./index.js";
```

---

## API & Configuration

- `logger.init(options)` — Initialize or update configuration.

  - `options.debug` (boolean, default: `false`) — Master switch. If `false`, no logs are emitted.
  - `options.prefix` (string, default: `🚀 [APP]`) — Text prefixed to every message.
  - `options.logLevel` (string, default: `verbose`) — Minimum level shown. One of: `verbose`, `warn`, `error`, `silent`.

- `logger.log(message, data?, functionName?)` — General-purpose log (shown when `logLevel` is `verbose`).
- `logger.info(message, data?, functionName?)` — Info-level (also follows `verbose` threshold).
- `logger.warn(message, data?, functionName?)` — Warning-level (shown when `logLevel` is `warn` or `verbose`).
- `logger.error(message, error?, functionName?)` — Error-level (shown when `logLevel` is `error` or higher).

Notes:

- In browsers messages are colorized using CSS for quick scanning. In Node, output is plain text and data objects are JSON-stringified for readability.
- `functionName` is optional and will be included in the message to help trace log origin.

---

## Log Level Behavior

- `verbose` — Show `log`, `info`, `warn`, and `error`.
- `warn` — Show only `warn` and `error`.
- `error` — Show only `error`.
- `silent` — No logs are shown.

---

## Best Practices

- Keep `debug: true` during development and CI; set `debug: false` in production to avoid leaking internal details.
- Use `prefix` to indicate module or feature area (e.g., `"🛒 [Cart]"`) for easier searching.
- Pass the optional `functionName` argument when tracing complex call flows.

---

## Contributing

Contributions and suggestions are welcome. Please open issues or pull requests on the repository.

---

## License

This project is licensed under the MIT License.
