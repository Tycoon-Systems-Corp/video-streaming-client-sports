"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
var _router = require("next/router");
var _layout = require("/layout");
var _ManagerModule = _interopRequireDefault(require("../streaming/manager/Manager.module.scss"));
var OPEN_PANEL_OFFSET = 1000;
var Module = function Module(props) {
  var router = (0, _router.useRouter)();
  var query = router.query,
    asPath = router.asPath;
  var _React$useState = _react["default"].useState(false),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    componentDidMount = _React$useState2[0],
    setComponentDidMount = _React$useState2[1];
  var _React$useState3 = _react["default"].useState({}),
    _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
    currentLive = _React$useState4[0],
    setCurrentLive = _React$useState4[1];
  var _React$useState5 = _react["default"].useState([]),
    _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
    feed = _React$useState6[0],
    setFeed = _React$useState6[1];
  var _React$useState7 = _react["default"].useState([]),
    _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
    combinedFeed = _React$useState8[0],
    setCombinedFeed = _React$useState8[1];
  var _React$useState9 = _react["default"].useState(false),
    _React$useState10 = (0, _slicedToArray2["default"])(_React$useState9, 2),
    adminPanelState = _React$useState10[0],
    setAdminPanelState = _React$useState10[1];
  var adminPanelContainerRef = _react["default"].useRef();
  props._LocalEventEmitter.unsubscribe('profilePage');
  props._LocalEventEmitter.subscribe('profilePage', function (d) {
    if (d && d.dispatch) {
      if (d.dispatch === 'openAdminPanel') {
        setAdminPanelState(true);
        props._setManagerOpen(true);
        if ((d === null || d === void 0 ? void 0 : d.menu) === 'stream') {
          props._LocalEventEmitter.dispatch('manager', {
            dispatch: 'setMenu',
            menu: 'stream'
          });
        }
        setTimeout(function () {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }, 1500);
      }
    }
  });
  _react["default"].useEffect(function () {
    if (!componentDidMount) {
      if ((query === null || query === void 0 ? void 0 : query.a) === 'openbeginstream') {
        setTimeout(function () {
          setAdminPanelState(true);
          props._setManagerOpen(true);
          props._LocalEventEmitter.dispatch('manager', {
            dispatch: 'setMenu',
            menu: 'stream'
          });
          setTimeout(function () {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 1500);
        }, OPEN_PANEL_OFFSET);
      } else if ((query === null || query === void 0 ? void 0 : query.a) === 'golive') {
        setTimeout(function () {
          setAdminPanelState(true);
          props._setManagerOpen(true);
          props._LocalEventEmitter.dispatch('manager', {
            dispatch: 'setMenu',
            menu: 'stream'
          });
          setTimeout(function () {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 1500);
        }, OPEN_PANEL_OFFSET);
      }
      setComponentDidMount(true);
    }
  }, [componentDidMount]);
  _react["default"].useEffect(function () {
    var _props$profileData, _props$profileData2;
    if (props !== null && props !== void 0 && (_props$profileData = props.profileData) !== null && _props$profileData !== void 0 && _props$profileData.currentLive) {
      setCurrentLive(props.profileData.currentLive);
      setCombinedFeed([props.profileData.currentLive].concat(feed));
    } else if (!(props !== null && props !== void 0 && (_props$profileData2 = props.profileData) !== null && _props$profileData2 !== void 0 && _props$profileData2.currentLive)) {
      console.log('Remove');
      var temp = (0, _toConsumableArray2["default"])(feed);
      var f = temp.findIndex(function (m) {
        var _props$profileData3;
        return (m === null || m === void 0 ? void 0 : m.author) === (props === null || props === void 0 || (_props$profileData3 = props.profileData) === null || _props$profileData3 === void 0 || (_props$profileData3 = _props$profileData3.user) === null || _props$profileData3 === void 0 ? void 0 : _props$profileData3.id) && (m === null || m === void 0 ? void 0 : m.status) === 'live';
      });
      console.log(f, temp);
      if (f > -1) {
        temp.splice(f, 1);
      }
      setCurrentLive({});
      setCombinedFeed(temp);
    }
  }, [props.profileData, feed]);
  var adminAuth = props._loggedIn && props._loggedIn.identifier && props.profileData && props.profileData.user && props.profileData.user.id && props._loggedIn.identifier === props.profileData.user.id;
  var toggleAdminPanel = _react["default"].useCallback(function (e) {
    var temp = adminPanelState;
    console.log(temp);
    if (temp) {
      temp = false;
    } else {
      temp = true;
      setTimeout(function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 1500);
    }
    setAdminPanelState(temp);
    props._setManagerOpen(temp);
  }, [adminPanelState]);

  // Enforce out of step global manager open state
  _react["default"].useEffect(function () {
    if (props._managerOpen === false && adminPanelState === true) {
      props._setManagerOpen(true);
    }
  }, [adminPanelState, props._managerOpen]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className)
  }, /*#__PURE__*/_react["default"].createElement(_layout.Profile, (0, _extends2["default"])({}, props, {
    adminAuth: adminAuth,
    combinedFeed: combinedFeed,
    adminPanelState: adminPanelState,
    toggleAdminPanel: toggleAdminPanel,
    adminPanelContainerRef: adminPanelContainerRef,
    ManagerStyles: _ManagerModule["default"]
  })));
};
var _default = exports["default"] = Module;