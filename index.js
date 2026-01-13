/**
 * @typedef {'verbose' | 'warn' | 'error' | 'silent'} LogLevel
 */

/**
 * @typedef {Object} LoggerConfig
 * @property {boolean} [debug=false] - Master switch to enable or disable logs
 * @property {string} [prefix='🚀 APP'] - Custom prefix for logs (e.g. '🛒 [Cart]')
 * @property {LogLevel} [logLevel='verbose'] - Minimum level to show
 */

class Logger {
  constructor() {
    /** @type {LoggerConfig} */
    this.config = {
      debug: false,
      prefix: "🚀 [APP]",
      logLevel: "verbose",
    };

    // Universal environment detection (Browser vs Node.js)
    this.isBrowser =
      typeof window !== "undefined" && typeof window.document !== "undefined";
  }

  /**
   * Initialize the logger configuration.
   * @param {LoggerConfig} options
   */
  init(options = {}) {
    this.config = { ...this.config, ...options };
  }

  /**
   * @private
   */
  _shouldLog(level) {
    if (!this.config.debug) return false;

    const levels = { verbose: 3, warn: 2, error: 1, silent: 0 };
    const currentScore = levels[this.config.logLevel] || 3;
    const targetScore = levels[level] || 0;

    return currentScore >= targetScore;
  }

  /**
   * @private
   */
  _formatMessage(level, message, functionName) {
    const time = new Date().toLocaleTimeString();
    const funcTag = functionName ? ` [Func: ${functionName}]` : "";
    return `${this.config.prefix} [${level}] ${time}${funcTag} ->`;
  }

  /**
   * Standard Log (Blue in Browser)
   * @param {string} message - The message text
   * @param {any} [data] - Optional data object/array
   * @param {string} [functionName] - Optional function name for tracing
   */
  log(message, data = null, functionName = "") {
    if (!this._shouldLog("verbose")) return;

    const msg = this._formatMessage("LOG", message, functionName);

    if (this.isBrowser) {
      console.log(`%c${msg}`, "color: #00BFFF; font-weight: bold;", data || "");
    } else {
      console.log(msg, data ? JSON.stringify(data, null, 2) : "");
    }
  }

  /**
   * Info Log (Green in Browser)
   */
  info(message, data = null, functionName = "") {
    if (!this._shouldLog("verbose")) return;

    const msg = this._formatMessage("INFO", message, functionName);

    if (this.isBrowser) {
      console.info(
        `%c${msg}`,
        "color: #32CD32; font-weight: bold;",
        data || ""
      );
    } else {
      console.info(msg, data ? JSON.stringify(data, null, 2) : "");
    }
  }

  /**
   * Warning Log (Gold in Browser)
   */
  warn(message, data = null, functionName = "") {
    if (!this._shouldLog("warn")) return;

    const msg = this._formatMessage("WARN", message, functionName);

    if (this.isBrowser) {
      console.warn(
        `%c${msg}`,
        "color: #FFD700; font-weight: bold;",
        data || ""
      );
    } else {
      console.warn(msg, data ? JSON.stringify(data, null, 2) : "");
    }
  }

  /**
   * Error Log (Red in Browser)
   */
  error(message, error = null, functionName = "") {
    if (!this._shouldLog("error")) return;

    const msg = this._formatMessage("ERROR", message, functionName);

    if (this.isBrowser) {
      console.error(
        `%c${msg}`,
        "color: #FF4500; font-weight: bold;",
        error || ""
      );
    } else {
      console.error(msg, error);
    }
  }
}

// Export singleton instance
export const logger = new Logger();
