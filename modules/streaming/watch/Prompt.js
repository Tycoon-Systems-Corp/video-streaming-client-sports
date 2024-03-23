"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _WatchPageModule = _interopRequireDefault(require("./WatchPage.module.scss"));
var _util = require("../../util");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Module = function Module(props) {
  var _props$className, _props$streamLeadProm, _props$streamLeadProm2, _props$streamLeadProm3, _props$streamLeadProm4, _props$streamLeadProm5;
  return <div className={"".concat((_props$className = props === null || props === void 0 ? void 0 : props.className) !== null && _props$className !== void 0 ? _props$className : '', " ").concat(_WatchPageModule["default"].streamLeadPrompt, " ").concat(!(0, _util.isObjectEmpty)(props === null || props === void 0 ? void 0 : props.streamLeadPrompt) ? _WatchPageModule["default"].streamLeadPrompt_Visible : '', " WatchPage_StreamLeadPrompt")} ref={props === null || props === void 0 ? void 0 : props.authContainer}>
            {props !== null && props !== void 0 && props.streamLeadPrompt ? <div>
                        {props !== null && props !== void 0 && (_props$streamLeadProm = props.streamLeadPrompt) !== null && _props$streamLeadProm !== void 0 && _props$streamLeadProm.lead ? <div>{props.streamLeadPrompt.lead}</div> : null}
                        {props !== null && props !== void 0 && (_props$streamLeadProm2 = props.streamLeadPrompt) !== null && _props$streamLeadProm2 !== void 0 && _props$streamLeadProm2.description ? <div>{props.streamLeadPrompt.description}</div> : null}
                        {props !== null && props !== void 0 && (_props$streamLeadProm3 = props.streamLeadPrompt) !== null && _props$streamLeadProm3 !== void 0 && _props$streamLeadProm3.password ? <div>{props.streamLeadPrompt.password}</div> : null}
                        {props !== null && props !== void 0 && (_props$streamLeadProm4 = props.streamLeadPrompt) !== null && _props$streamLeadProm4 !== void 0 && _props$streamLeadProm4.tags ? <div>{props.streamLeadPrompt.tags}</div> : null}
                        {props !== null && props !== void 0 && (_props$streamLeadProm5 = props.streamLeadPrompt) !== null && _props$streamLeadProm5 !== void 0 && _props$streamLeadProm5.tagsList ? <div>{streamLeadPrompt.tagsList}</div> : null}
                    </div> : null}
        </div>;
};
var _default = exports["default"] = Module;