"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mainModule = _interopRequireDefault(require("./main.module.css"));

var _commons = require("../helpers/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Location = _ref => {
  let {
    wrapperCustomClassNames = [],
    data,
    disabled = false,
    showIcon = true,
    oneLine = false,
    linkClassName = '',
    textClassName = ''
  } = _ref;
  if (!data) return null;
  const {
    lat,
    lng
  } = data;

  if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _commons.combineClassNames)([_mainModule.default.location_parent, ...wrapperCustomClassNames])
    }, /*#__PURE__*/_react.default.createElement("p", {
      className: (0, _commons.combineClassNames)([oneLine ? _mainModule.default.oneLine : undefined, textClassName])
    }, data.address));
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _commons.combineClassNames)([_mainModule.default.location_parent, ...wrapperCustomClassNames])
  }, showIcon && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _commons.combineClassNames)([_mainModule.default.icon, 'icon-map-pin', linkClassName])
  }), /*#__PURE__*/_react.default.createElement("a", {
    href: disabled ? undefined : "https://www.google.com/maps/search/?api=1&query=".concat(encodeURIComponent(data.address)),
    target: "_blank",
    className: (0, _commons.combineClassNames)([oneLine ? _mainModule.default.oneLine : undefined, linkClassName]),
    onClick: e => {
      e.stopPropagation();
      disabled && e.preventDefault();
    }
  }, data.address));
};

Location.propTypes = {
  data: _propTypes.default.shape({
    address: _propTypes.default.string,
    email: _propTypes.default.string,
    name: _propTypes.default.string,
    phone: _propTypes.default.string,
    website: _propTypes.default.string,
    city: _propTypes.default.string,
    statesList: _propTypes.default.string,
    country: _propTypes.default.string,
    postal: _propTypes.default.string,
    lat: _propTypes.default.number,
    lng: _propTypes.default.number
  }),
  wrapperCustomClassNames: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  showIcon: _propTypes.default.bool,
  oneLine: _propTypes.default.bool,
  linkClassName: _propTypes.default.string,
  textClassName: _propTypes.default.string
};
var _default = Location;
exports.default = _default;