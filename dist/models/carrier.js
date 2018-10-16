var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carrier = function () {
  _createClass(Carrier, null, [{
    key: 'formatTrackingCarrier',

    // returns the formated carrier if it is valid for tracking, false otherwise
    value: function formatTrackingCarrier(carrier) {
      var formattedCarrier = carrier.toLowerCase().replace('.', '_');
      var carrierIndex = Carrier.TRACKING_CARRIER_LIST.indexOf(formattedCarrier);

      if (carrierIndex === -1) return false;
      return Carrier.TRACKING_CARRIER_LIST[carrierIndex];
    }

    // TODO add more informatino about the carrier

  }]);

  function Carrier(carrier_id, carrier_code) {
    var services = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Carrier);

    this.services = services;
  }

  _createClass(Carrier, [{
    key: 'setServices',
    value: function setServices(services) {
      this.services = services;
    }
  }]);

  return Carrier;
}();

Carrier.CARRIER_CODES = {
  UPS: 'ups',
  FEDEX: 'fedex',
  USPS: 'usps',
  STAMPS: 'stamps_com'
};

// TODO combine with CARRIER_CODES for a single object
Carrier.CARRIER_IDS = {};

Carrier.TRACKING_CARRIER_LIST = [Carrier.CARRIER_CODES.UPS, Carrier.CARRIER_CODES.FEDEX, Carrier.CARRIER_CODES.USPS, Carrier.CARRIER_CODES.STAMPS];

Carrier.TRACKING_STATUS_CODES = {
  ACCEPTED: 'AC',
  IN_TRANSIT: 'IT',
  DELIVERED: 'DE',
  EXCEPTION: 'EX',
  UNKNOWN: 'UN'
};

// TODO: build this once models are built out further
// class CarrierService {
//   constructor(carrier_id, carrier_code, service_code, name, domestic, international, is_multi_package_supported) {
//     this.carrier_id = carrier_id;
//     this.carrier_code = carrier_code;
//     this.service_code = service_code;
//     this.name = name;
//     this.domestic = domestic;
//     this.internaional = international;
//     this.is_multi_package_supported = is_multi_package_supported;
//   }
// }

export { Carrier };