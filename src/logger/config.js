/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

/**
 * Get default logger configuration based on environment
 * @returns {Object} Default configuration object
 */
export const getDefaultConfig = () => {
  // Detect environment - fallback to development if not set
  const env =
    (typeof process !== "undefined" && process.env && process.env.NODE_ENV) ||
    "development";

  // Environment-specific defaults
  const environmentDefaults = {
    development: {
      level: "debug",
      enabled: true
    },
    production: {
      level: "warn",
      enabled: true
    },
    test: {
      level: "error",
      enabled: false
    }
  };

  // Base defaults
  const baseDefaults = {
    level: "warn",
    enabled: true,
    prefix: "Megadraft",
    environment: env
  };

  // Merge base defaults with environment-specific defaults
  return {
    ...baseDefaults,
    ...(environmentDefaults[env] || environmentDefaults.development)
  };
};

/**
 * Validate logger configuration
 * @param {Object} config - Configuration to validate
 * @returns {Object} Validated and sanitized configuration
 */
export const validateConfig = (config = {}) => {
  const validLevels = ["error", "warn", "info", "debug"];

  const validated = { ...config };

  // Validate log level
  if (validated.level && !validLevels.includes(validated.level.toLowerCase())) {
    console.warn(
      `[Megadraft Logger] Invalid log level "${validated.level}". Using "warn" instead.`
    );
    validated.level = "warn";
  }

  // Ensure enabled is boolean
  if (typeof validated.enabled !== "boolean") {
    validated.enabled = true;
  }

  // Ensure prefix is string
  if (typeof validated.prefix !== "string") {
    validated.prefix = "Megadraft";
  }

  return validated;
};

/**
 * Create a complete configuration by merging user config with defaults
 * @param {Object} userConfig - User provided configuration
 * @returns {Object} Complete configuration object
 */
export const createConfig = (userConfig = {}) => {
  const defaults = getDefaultConfig();
  const validated = validateConfig(userConfig);

  return {
    ...defaults,
    ...validated
  };
};
