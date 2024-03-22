"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var Module = function Module(props) {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("img", {
    className: "ProfilePage_Icon",
    src: props.profileData && props.profileData.user && props.profileData.user.icon ? props.profileData.user.icon : ''
  }));
};
var _default = exports["default"] = Module;