module.exports = {
  "env": {
      "es6": true,
      "react-native/react-native": true,
      "jest/globals": true
  },
  "parser": "babel-eslint",
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "react-native",
      "jest"
  ],
  "settings": {
      "react": {
          "version": "detect"
      }
  },
  "rules": {
      "indent": [
          "error",
          2, {
              "SwitchCase": 1,
              "flatTernaryExpressions": true
          }
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ],
      "comma-dangle": [
          "error",
          "never"
      ],
      "no-trailing-spaces": 2,
      "require-await": 2,
      "react/prop-types": 2,
      "react-native/no-unused-styles": 2,
      "react-native/no-inline-styles": 2,
      "space-in-parens": [
        "error",
        "never"
      ],
      "comma-spacing": [
        "error",
        {
          "before": false,
          "after": true
        }
      ],
      "keyword-spacing": [
        "error",
        {
          "before": true,
          "after": true
        }
      ],
      "key-spacing": [
        "error",
        {
          "beforeColon": false,
          "afterColon": true
        }
      ],
      "no-trailing-spaces": "error",
      "space-before-blocks": "error",
      "arrow-spacing": [
        "error",
        {
          "before": true,
          "after": true
        }
      ],
      "no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxEOF": 1
        }
      ],
      "react-native/no-raw-text": [
          "error", {
              "skip": [
                  "Para",
                  "H0",
                  "H1",
                  "H2",
                  "H3",
                  "H4",
                  "H5",
                  "Label",
                  "Footnote",
                  "ColoredHeader",
                  "Circle",
                  "Subtitle",
                  "Footnote"
              ]
          }
      ]
  }
};
