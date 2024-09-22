# ToDo List App

A simple ToDo List application built with TypeScript, React, and Node.js. This project demonstrates the use of modern web development technologies and practices, including Jest for testing and Prettier for code formatting.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/todolist-app.git
   cd todolist-app
   ```
2. **Install Dependencies**
```
npm install
```
## Usage
1. **Start the development server:**
   ```
   npm run dev
   ```
2. **Open your browser and navifgate to:**
  ```
  http://localhost:3000
  ```
## Testing

This project uses Jest for unit testing. To run the tests, use the following command:
```
npm run test
```
## Example Test Output
```
> jest

 PASS  src/__tests__/todoService.test.ts
  todoService
    ✓ should fetch all to-do items (xx ms)
    ✓ should add a new to-do item (xx ms)
    ✓ should delete a to-do item by ID (xx ms)
    ✓ should toggle the completion status of a to-do item (xx ms)
    ✓ should search for to-do items using fuzzy search (xx ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        xx s
Ran all test suites.
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Configuration

## Prettier
This project uses Prettier for code formatting. The confguration is defined in the .prettierrc file
```
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "printWidth": 80,
  "endOfLine": "lf"
}
```

## ESLint

ESLint is used for linting the code. The configuration is defined in the .eslintrc.json file:
```
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "indent": ["error", 2]
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

## Jest

Jest is configured in the jest.config.js file:
```
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```
