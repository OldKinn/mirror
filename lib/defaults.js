"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defaults;
exports.options = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _effects = require("./effects");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var options = {
  historyMode: 'browser',
  middlewares: [],
  reducers: {},
  addEffect: (0, _effects.addEffect)(_effects.effects)
};
exports.options = options;
var historyModes = ['browser', 'hash', 'memory'];

function defaults() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var historyMode = opts.historyMode,
      middlewares = opts.middlewares;

  if (historyMode && !historyModes.includes(historyMode)) {
    throw new Error("historyMode \"".concat(historyMode, "\" is invalid, must be one of ").concat(historyModes.join(', '), "!"));
  }

  if (middlewares && !Array.isArray(middlewares)) {
    throw new Error("middlewares \"".concat(middlewares, "\" is invalid, must be an Array!"));
  }

  Object.keys(opts).forEach(function (key) {
    if (key === 'reducers') {
      options[key] = _objectSpread(_objectSpread({}, options[key]), opts[key]);
    } else {
      options[key] = opts[key];
    }
  });
}