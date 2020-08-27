"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createMiddleware;
exports.middleware = void 0;

var _effects = require("./effects");

var _hook = require("./hook");

function warning() {
  throw new Error('存储对象(store)未创建，无法调用dispatch和getState');
}

var middleware = {
  dispatch: warning,
  getState: warning
};
exports.middleware = middleware;

function createMiddleware() {
  return function (middlewareAPI) {
    middleware.dispatch = middlewareAPI.dispatch;
    middleware.getState = middlewareAPI.getState;
    return function (next) {
      return function (action) {
        var result = next(action);

        if (typeof _effects.effects[action.type] === 'function') {
          result = _effects.effects[action.type](action.data, middleware.getState);
        }

        _hook.hooks.forEach(function (hook) {
          return hook(action, middleware.getState);
        });

        return result;
      };
    };
  };
}