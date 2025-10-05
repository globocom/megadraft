/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { Logger } from "./Logger";
import { createConfig } from "./config";

/**
 * Create a new logger instance with custom configuration
 * @param {Object} config - Custom logger configuration
 * @returns {Logger} Configured logger instance
 */
export const createLogger = (config = {}) => {
  const finalConfig = createConfig(config);
  return new Logger(finalConfig);
};

/**
 * Default logger instance with environment-aware configuration
 * This is the main logger that should be used throughout the application
 */
const defaultLogger = createLogger();

/**
 * Export individual logging methods for convenience
 */
export const error = (message, context) =>
  defaultLogger.error(message, context);
export const warn = (message, context) => defaultLogger.warn(message, context);
export const info = (message, context) => defaultLogger.info(message, context);
export const debug = (message, context) =>
  defaultLogger.debug(message, context);

/**
 * Export the default logger instance
 */
export const logger = defaultLogger;

/**
 * Export Logger class and config utilities for advanced usage
 */
export { Logger } from "./Logger";
export { getDefaultConfig, validateConfig, createConfig } from "./config";

/**
 * Default export is the configured logger instance
 */
export default defaultLogger;
