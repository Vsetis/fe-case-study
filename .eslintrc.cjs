module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        "plugin:prettier/recommended",
        "prettier"
    ],
    "overrides": [
        {
            "files": ["*.js", "*.jsx"],
            "rules": {
                "no-use-before-define": ["error"],
                "no-shadow": ["error"],
                "@typescript-eslint/...": "off",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', "prettier"],
    rules: {
        "prettier/prettier": "warn",
       "react-refresh/only-export-components": [
           "warn",
           {allowConstantExport: true}
       ]
    },
}