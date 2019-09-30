module.exports = {
  "verbose": true,
  "transform": {
    "^.+\\.js$": "<rootDir>/jest.transform.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.jsx?$",
  "moduleFileExtensions": ["js", "json", "jsx", "node"],

  "setupFiles": [
    "./setupTests",
    "core-js"
  ],
  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy",
  },
  "setupFilesAfterEnv": [
    '@testing-library/react/cleanup-after-each', /* clean up jsdom state after each test */
    '@testing-library/jest-dom/extend-expect', /* add toBeEnabled(), toHaveAttribute(), etc. */
    'jest-expect-message' /* add second argument "message" to expect() so that we can give explanations on failures */
  ],

  // Code Coverage
  'collectCoverage': false,
  'coverageDirectory': 'test-reports/coverage/unit',
  'collectCoverageFrom': [
    '<rootDir>/src/**/*.{js,jsx}'
  ],
  'coveragePathIgnorePatterns': [
    '/node_modules/'
  ],

  "coverageThreshold": {
    "global": {
      "branches": 0,
      "functions": 0,
      "lines": 12,
      "statements": 0
    }
  },

  coverageReporters: [
    'cobertura',
    'json',
    'html'
  ],
  reporters: [
    'default',
    ['jest-junit',
      {
        suiteName: 'Reddit DEMO JavaScript Unit Tests',
        outputDirectory: 'test-reports/results',
        outputName: 'junit.xml',
        ancestorSeparator: '>>>',
        titleTemplate: '{title}',
        classNameTemplate: info => {
          if(info.classname) {
            const classname = info.classname.match(/>>>([^>]+)/);
            if(classname) {
              return classname[1];
            }
          }
          return `NO CLASSNAME: ${info}`;
        },
        suiteNameTemplate: '{title}' // this title is different than the one in classNameTemplate function
      }
    ]
  ]
};