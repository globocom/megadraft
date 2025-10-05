/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

/**
 * Centralized logging system for Megadraft
 * Provides configurable log levels and environment-aware defaults
 */
export class Logger {
  static LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
  };

  /**
   * Create a new Logger instance
   * @param {Object} config - Logger configuration
   * @param {string} config.level - Log level (error, warn, info, debug)
   * @param {boolean} config.enabled - Whether logging is enabled
   * @param {string} config.prefix - Prefix for log messages
   */
  constructor(config = {}) {
    this.config = this.mergeConfig(config);
    this.levelValue =
      Logger.LEVELS[this.config.level.toUpperCase()] || Logger.LEVELS.WARN;
  }

  /**
   * Merge user config with defaults
   * @param {Object} userConfig - User provided configuration
   * @returns {Object} Merged configuration
   */
  mergeConfig(userConfig) {
    const defaults = {
      level: "warn",
      enabled: true,
      prefix: "Megadraft"
    };

    return {
      ...defaults,
      ...userConfig
    };
  }

  /**
   * Log an error message
   * @param {string} message - Error message
   * @param {Object} context - Additional context information
   */
  error(message, context = {}) {
    if (this.shouldLog("ERROR")) {
      this.output("error", message, context);
    }
  }

  /**
   * Log a warning message
   * @param {string} message - Warning message
   * @param {Object} context - Additional context information
   */
  warn(message, context = {}) {
    if (this.shouldLog("WARN")) {
      this.output("warn", message, context);
    }
  }

  /**
   * Log an info message
   * @param {string} message - Info message
   * @param {Object} context - Additional context information
   */
  info(message, context = {}) {
    if (this.shouldLog("INFO")) {
      this.output("info", message, context);
    }
  }

  /**
   * Log a debug message
   * @param {string} message - Debug message
   * @param {Object} context - Additional context information
   */
  debug(message, context = {}) {
    if (this.shouldLog("DEBUG")) {
      this.output("log", message, context);
    }
  }

  /**
   * Check if a message should be logged based on current level
   * @param {string} level - Log level to check
   * @returns {boolean} Whether the message should be logged
   */
  shouldLog(level) {
    return this.config.enabled && Logger.LEVELS[level] <= this.levelValue;
  }

  /**
   * Output a log message to console
   * @param {string} method - Console method to use
   * @param {string} message - Message to log
   * @param {Object} context - Context information
   */
  output(method, message, context) {
    const prefix = `[${this.config.prefix}]`;

    try {
      if (Object.keys(context).length > 0) {
        console[method](prefix, message, context);
      } else {
        console[method](prefix, message);
      }
    } catch (error) {
      // Fallback to basic console if there's an issue
      console.warn("Logger error:", error);
      console[method](message);
    }
  }
}

export default Logger;
