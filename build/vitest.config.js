"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// vitest.config.ts
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        coverage: {
            provider: "v8",
        },
    },
});
