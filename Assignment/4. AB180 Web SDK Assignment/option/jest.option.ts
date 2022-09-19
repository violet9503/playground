const option = {
    rootDir: '../',
    transform: {
        '\\.(ts|js)$': '@swc/jest',
    },
    testMatch: [
        '<rootDir>/test-unit/**/*.test.ts',
    ],
}

export default option