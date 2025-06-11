// CommonJS entry point for paletter
// This file allows requiring the library in CommonJS environments

try {
  const PaletterModule = require('./index.umd.cjs'); // Changed to .cjs
  // If index.umd.cjs was treated as ESM by require, .default might be needed.
  // Otherwise, PaletterModule is the export (standard UMD in CJS).
  module.exports = PaletterModule.default || PaletterModule;
} catch (e) {
  // Fallback for issues like ERR_REQUIRE_ESM
  console.error(
    'Paletter CJS Error: Failed to load UMD module. Check module types.',
    e
  );
  module.exports = {}; // Graceful fallback
}
