// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Disable package exports to prevent resolving ESM builds (like zustand) that use import.meta
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
