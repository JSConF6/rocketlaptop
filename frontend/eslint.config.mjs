import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: [
      '.next',
      'node_modules',
      'next.config.mjs',
      'eslint.config.mjs',
      'postcss.config.mjs',
      'components/ui/*',
    ],
  },
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      'unused-imports': unusedImports,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      // any 타입 사용 금지
      '@typescript-eslint/no-explicit-any': 'error',
      // Promise 반환 함수 async 키워드 강제
      '@typescript-eslint/promise-function-async': 'error',
      // 함수 반환 타입 명시 필수
      '@typescript-eslint/explicit-function-return-type': 'warn',
      // 타입 단언할 때는 as만 사용
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow',
        },
      ],
      'react/react-in-jsx-scope': 'off', // React를 JSX에서 명시적으로 임포트할 필요가 없음
      'react/jsx-uses-react': 'off', // React 객체를 JSX 코드에서 사용할 필요가 없음
      'react/prop-types': 'off', // PropTypes를 사용할 필요가 없음
      'react/jsx-uses-vars': 'error', // JSX 코드에서 사용하지 않는 변수를 경고
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 80,
          bracketSpacing: true,
          arrowParens: 'avoid',
        },
      ],
      // 사용안하는 import 자동 제거
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
);
