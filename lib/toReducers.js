"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toReducers;

var _model = require("./model");

function toReducers() {
  return _model.models.reduce(function (acc, cur) {
    acc[cur.name] = cur.reducer;
    return acc;
  }, {});
}