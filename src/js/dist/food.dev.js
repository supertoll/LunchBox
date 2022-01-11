"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function food(_name, _providerId, _cost) {
  this.name = _name;
  this.providerId = _providerId;
  this.cost = _cost;
}

var testfoods = [{
  name: "bread",
  cost: "3,50",
  id: 1
}, {
  name: "soup",
  cost: "2,00",
  id: 2
}, {
  name: "rice",
  cost: "2,50",
  id: 3
}];
var _default = testfoods;
exports["default"] = _default;