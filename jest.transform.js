module.exports = require('babel-jest').createTransformer({
  presets: [
    "@babel/env",
    "@babel/react",
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    ['@babel/plugin-syntax-dynamic-import'],
	   ["@babel/plugin-transform-runtime", {
      "regenerator": true
    }]
  ]
});
