import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});

export default [
    ...compat.extends('airbnb-base'),
    ...compat.extends('plugin:prettier/recommended'),
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
    },
];
