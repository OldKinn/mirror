"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = createStore;
exports.replaceReducer = replaceReducer;
exports.store = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _redux = require("redux");

var _middleware = _interopRequireDefault(require("./middleware"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var store = {};
exports.store = store;

function createReducer(models, reducers) {
  var modelReducers = models.reduce(function (acc, cur) {
    acc[cur.name] = cur.reducer;
    return acc;
  }, {});
  return (0, _redux.combineReducers)(_objectSpread(_objectSpread({}, reducers), modelReducers));
}

function createStore(models, reducers, initialState) {
  var middlewares = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var middleware = _redux.applyMiddleware.apply(void 0, (0, _toConsumableArray2["default"])(middlewares).concat([(0, _middleware["default"])()]));

  var enhancers = [middleware];
  var composeEnhancers = _redux.compose;

  if (process.env.NODE_ENV !== 'production') {
    if (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  var reducer = createReducer(models, reducers);
  var enhancer = composeEnhancers.apply(void 0, enhancers);
  store.data = (0, _redux.createStore)(reducer, initialState, enhancer);
  return store;
}

function replaceReducer(store2, models, reducers) {
  var reducer = createReducer(models, reducers);
  store2.replaceReducer(reducer);
}