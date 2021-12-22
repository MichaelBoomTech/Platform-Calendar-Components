"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGuestLimitProperties = exports.getRegistrationProperties = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.replace.js");

var _moment = _interopRequireDefault(require("moment"));

var _commons = require("./commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const findAddon = (addons, addonName) => addons === null || addons === void 0 ? void 0 : addons.find(_ref => {
  let {
    name
  } = _ref;
  return addonName === name;
});

const getRegistrationProperties = _ref2 => {
  let {
    addons,
    eventRegistration,
    eventKind,
    planGuestLimit
  } = _ref2;
  const registration_addon = findAddon(addons, 'registration');
  if (!registration_addon && eventKind !== 4) return null;
  let registration_properties = {};

  if (eventKind === 4) {
    if (eventRegistration) {
      registration_properties = eventRegistration;
    }
  } else {
    var _registration_addon$v, _registration$general;

    const registration = (eventRegistration === null || eventRegistration === void 0 ? void 0 : eventRegistration.value) || (registration_addon === null || registration_addon === void 0 ? void 0 : (_registration_addon$v = registration_addon.value) === null || _registration_addon$v === void 0 ? void 0 : _registration_addon$v.registration);

    if ((registration === null || registration === void 0 ? void 0 : (_registration$general = registration.general) === null || _registration$general === void 0 ? void 0 : _registration$general.limit) === 0) {
      registration.general.limit = planGuestLimit || 500;
    }

    const {
      texts,
      general,
      open
    } = registration;
    const {
      page_url,
      limit,
      limit_type,
      show_guest
    } = general;
    registration_properties.registration_enabled = open;
    registration_properties.page_url = page_url;
    registration_properties.rsvp = texts.rsvp;
    registration_properties.guest_limit = limit;
    registration_properties.guest_limit_type = limit_type;
    registration_properties.show_guest_limit = show_guest;
  }

  return registration_properties;
};

exports.getRegistrationProperties = getRegistrationProperties;

const getGuestLimitProperties = props => {
  const {
    eventKind,
    eventPageUrl,
    planGuestLimit = 0,
    eventEndDate,
    addons,
    eventTicket,
    repeat,
    guests,
    eventStartDate,
    comp_id = '',
    instance = '',
    eventId = '',
    registrationPageUrl = '',
    text
  } = props;
  const button_properties = {};
  const registration = getRegistrationProperties(props);
  if (!registration) return {};

  if (eventKind === 4) {
    if (registration) {
      const {
        status,
        external
      } = registration;

      if (!status) {
        // In case of registration url as an external link from EventBrite or Wix
        if (typeof registration === 'string') {
          button_properties.showButton = true;
          button_properties.buttonText = text;
          button_properties.page_url = registration;
        }
      } else {
        if (['NA_REGISTRATION_STATUS', 'CLOSED', 'CLOSED_MANUALLY'].includes(status)) {
          button_properties.showButton = false;
        } else {
          button_properties.showButton = true;
          button_properties.buttonText = text;
          button_properties.page_url = status === 'OPEN_EXTERNAL' ? external.registration : eventPageUrl + '/form';
        }
      }
    }
  } else {
    const {
      registration_enabled,
      page_url,
      rsvp
    } = registration;

    if (registration_enabled) {
      button_properties.showButton = true;
      button_properties.buttonText = rsvp;

      if (page_url) {
        button_properties.page_url = page_url;
      } else {
        button_properties.page_url = "".concat(registrationPageUrl).concat((0, _commons.encodeId)(String(eventId)), "?comp_id=").concat(comp_id, "&instance=").concat(instance, "&startDate=").concat(repeat.type ? eventStartDate.split('T')[0] : "");
      }
    }
  }

  const format = eventEndDate.includes('T') ? 'YYYY-MM-DD[T]HH:mm:ss' : 'YYYY-MM-DD';

  if ((0, _moment.default)(eventEndDate.replace('T', ' ')).isBefore((0, _moment.default)((0, _moment.default)().format(format)))) {
    button_properties.showButton = false;
  }

  const ticket_addon = findAddon(addons, 'ticket');
  const {
    value: ticket
  } = eventTicket || ticket_addon || {};
  const guest_limit_properties = {
    guest_limit: 0,
    show_guest_limit: true
  };

  if (ticket_addon && ticket.general.open) {
    var _ticket$fields;

    ticket === null || ticket === void 0 ? void 0 : (_ticket$fields = ticket.fields) === null || _ticket$fields === void 0 ? void 0 : _ticket$fields.forEach(_ref3 => {
      let {
        limitNumber,
        limit
      } = _ref3;

      if (limit) {
        guest_limit_properties.showGuestLimit = false;
      }

      if (typeof guest_limit_properties.guest_limit === 'string') return;
      guest_limit_properties.guest_limit = limit ? 'unlimited' : guest_limit_properties.guest_limit + limitNumber;
    });
  } else {
    guest_limit_properties.show_guest_limit = button_properties.showButton && registration.registration_enabled && registration.guest_limit_type !== 'unlimited' && registration.show_guest_limit && eventKind !== 4;
    guest_limit_properties.guest_limit = registration ? planGuestLimit !== 0 ? Math.min(+registration.guest_limit, planGuestLimit) : +registration.guest_limit : null;
  }

  return _objectSpread(_objectSpread(_objectSpread({}, button_properties), guest_limit_properties), {}, {
    guestsCount: getGuestsCount(addons, eventTicket, repeat, guests, eventStartDate)
  });
};

exports.getGuestLimitProperties = getGuestLimitProperties;

const getGuestsCount = function getGuestsCount(addons, eventTicket, repeat) {
  let guests = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  let startDate = arguments.length > 4 ? arguments[4] : undefined;
  const ticket_addon = findAddon(addons, 'ticket');
  const ticketAddonEnabled = ticket_addon && ticket_addon.value.general.open;
  const {
    type: repeatType
  } = repeat;
  let allGuests = [];

  if (typeof guests === 'number' || !repeat || !repeatType) {
    allGuests = guests;
  } else {
    guests && guests.forEach(g => {
      const {
        date
      } = g;

      if (date && (0, _moment.default)(date).format('DD-MM-YYYY') === (0, _moment.default)(startDate).format('DD-MM-YYYY')) {
        allGuests.push(g);
      }
    });
  }

  let soldTicketsCount = 0;

  if (ticket_addon && !eventTicket && ticketAddonEnabled || eventTicket && eventTicket.value.general.open) {
    guests && guests.forEach((_ref4, i) => {
      let {
        value,
        date
      } = _ref4;
      const {
        ticket = []
      } = value;

      if (ticket && ticket.length && date && (0, _moment.default)(date).format('DD-MM-YYYY') === (0, _moment.default)(startDate).format('DD-MM-YYYY') || !date) {
        ticket.forEach((_ref5, i) => {
          let {
            quantity
          } = _ref5;
          soldTicketsCount += +quantity;
        });
      }
    });
  } else {
    soldTicketsCount = allGuests.length;
  }

  return soldTicketsCount;
};