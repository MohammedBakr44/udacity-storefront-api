module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"

    ],
    "rules": {
        "prettier/prettier": 1,
        'no-use-before-define': ['error', { functions: true, classes: true }],
        'prettier/prettier': 2, // Means error
        'no-console': 1, // Means warning
        'no-var': 'error',
        'prefer-const': 'error'
    }
}
