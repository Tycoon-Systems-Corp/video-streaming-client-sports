var _div, _div2;
var REACT_ELEMENT_TYPE;
function _jsx(e, r, E, l) { REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103); var o = e && e.defaultProps, n = arguments.length - 3; if (r || 0 === n || (r = { children: void 0 }), 1 === n) r.children = l;else if (n > 1) { for (var t = new Array(n), f = 0; f < n; f++) t[f] = arguments[f + 3]; r.children = t; } if (r && o) for (var i in o) void 0 === r[i] && (r[i] = o[i]);else r || (r = o || {}); return { $$typeof: REACT_ELEMENT_TYPE, type: e, key: void 0 === E ? null : "" + E, ref: null, props: r, _owner: null }; }
import React from 'react';
const Module = props => {
  return /*#__PURE__*/_jsx(React.Fragment, {}, void 0, props._loggedIn ? /*#__PURE__*/_jsx(React.Fragment, {}, void 0, /*#__PURE__*/_jsx("li", {
    onClick: props?.handleLogout
  }, void 0, _div || (_div = /*#__PURE__*/_jsx("div", {
    className: `material-icons`
  }, void 0, "logout")), _div2 || (_div2 = /*#__PURE__*/_jsx("div", {}, void 0, "Sign Out")))) : null);
};
export default Module;