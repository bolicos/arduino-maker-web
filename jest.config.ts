import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
    ...defaults,
    testEnvironment: "jsdom",
    verbose: true,
    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.tsx",
    ],
    moduleNameMapper: {
        "#/(.*)": "<rootDir>/src/$1",
    },
    collectCoverage: true,
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: [
        "json",
        "html"
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        },
        "*/**": {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        },
    },
    transform: {
        "\\.[jt]sx?$": "ts-jest",
        "^.+\\.css$": ["jest-transform-css", { modules: true }]
    },
    transformIgnorePatterns: [
        "!node_modules/"
    ],
    globals: {
        REACT_APP_NAME: "SMART_CODE",
    },
};

export default config;