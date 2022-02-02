"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mainModule = _interopRequireDefault(require("./main.module.css"));

var _commons = require("./../helpers/commons");

var _commonPropTypes = require("../helpers/commonPropTypes");

var _guestLimit = require("../helpers/guestLimit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RegistrationButton = _ref => {
  var _event$registration, _event$tickets;

  let {
    cid,
    text = 'Register',
    urlBase,
    event,
    globalRegistration,
    globalTickets,
    wrapperCustomClassNames = []
  } = _ref;
  const registration = (_event$registration = event.registration) !== null && _event$registration !== void 0 ? _event$registration : globalRegistration;
  const tickets = (_event$tickets = event.tickets) !== null && _event$tickets !== void 0 ? _event$tickets : globalTickets;
  const show = (0, _guestLimit.getShowRegistrationButtonStatus)(event, registration);
  if (!show) return null;
  const url = (0, _guestLimit.generateRegistrationURL)(cid, event, registration, urlBase);
  const guestsOptions = (0, _guestLimit.getGuestsOptions)(event, registration, tickets);
  if (!guestsOptions) return null;
  const {
    count,
    limit
  } = guestsOptions;
  return /*#__PURE__*/_react.default.createElement("button", {
    className: (0, _commons.combineClassNames)([_mainModule.default.register_button, ...wrapperCustomClassNames]),
    disabled: count >= limit,
    onClick: () => window.open(url, '_blank')
  }, text);
};

RegistrationButton.propTypes = {
  cid: _commonPropTypes.PT_Cid.isRequired,
  urlBase: _propTypes.default.string.isRequired,
  text: _propTypes.default.string,
  event: _commonPropTypes.SHAPE_EVENT,
  globalRegistration: _commonPropTypes.SHAPE_REGISTRATION,
  globalTickets: _commonPropTypes.SHAPE_TICKETS,
  wrapperCustomClassNames: _propTypes.default.arrayOf(_propTypes.default.string)
};
var _default = RegistrationButton;
exports.default = _default;