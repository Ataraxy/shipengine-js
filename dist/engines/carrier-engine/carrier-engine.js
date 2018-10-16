'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CarrierEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestEngine = require('../../request-engine');

var _shipment = require('../../models/shipment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Models 


var CarrierEngine = function (_RequestEngine) {
    _inherits(CarrierEngine, _RequestEngine);

    function CarrierEngine() {
        var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, CarrierEngine);

        return _possibleConstructorReturn(this, (CarrierEngine.__proto__ || Object.getPrototypeOf(CarrierEngine)).call(this, api_key));
    }

    /**
     * List currently set up carriers
     * 
     * @returns {Promise} - JS promise wrapped around an array of carrier objects
     */


    _createClass(CarrierEngine, [{
        key: 'getCarriers',
        value: function getCarriers() {
            // https://docs.shipengine.com/docs/list-your-carriers

            var path = 'carriers';
            var options = this.generateOptions(path);

            return this.request(options);
        }

        /**
         * Get an estimated rate for the shipping information and package (parcel) 
         * given. 
         * 
         * @param {Object} shipment - Object containing information about shipment
         * @param {string} shipment.carrier_id - ShipEngine assigned carrier id 
         * @param {Object} shipment.ship_from - Object containing information about the shipping depature location
         * @param {string} shipment.ship_from.country_code - Departing country code
         * @param {string} shipment.ship_from.postal_code - Departing postal code
         * @param {Object} shipment.ship_to - Object containing information about the shipment receiver
         * @param {string} shipment.ship_to.country_code - Recipient country code
         * @param {string} shipment.ship_to.postal_code - Recipient postal code
         * @param {string} shipment.ship_to.city_locality - Recipient city/locality
         * @param {string} shipment.ship_to.state_provice - Recipient state/province
         * @param {string} [shipment.confirmation="none"] - Confirmation option for shipment
         * @param {string} [shipment.address_residential_indicator="no"] - Indicate if address is residential
         * @param {Object} parcel - Object with description of package (Follows Package class format) being shipped
         * @returns {Promise} - JS Promise wrapped around object an array containing information about estiamted
         * rates from the provided carrier
         */

    }, {
        key: 'estimateRate',
        value: function estimateRate(shipment, parcel) {
            // https://docs.shipengine.com/docs/estimate-a-rate

            var path = 'rates/estimate';
            var body = {
                carrier_id: shipment.carrier_id,
                from_country_code: shipment.ship_from.country_code,
                from_postal_code: shipment.ship_from.postal_code,
                to_country_code: shipment.ship_to.country_code,
                to_postal_code: shipment.ship_to.postal_code,
                to_city_locality: shipment.ship_to.city_locality,
                to_state_province: shipment.ship_to.state_provice,
                weight: parcel.weight
            };

            if (shipment.confirmation) {
                body.confirmation = shipment.confirmation;
            } else {
                body.confirmation = _shipment.Shipment.CONFIRMATION_OPTIONS.NONE;
            }

            if (shipment.address_residential_indicator) body.address_residential_indicator = shipment.address_residential_indicator;else body.address_residential_indicator = "no";

            if (parcel.dimensions) body.dimensions = parcel.dimensions;

            // TODO update docs
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Adds funds to the account with the given carrier. Currently only Stamps.comd and 
         * Endicia support this. 
         * 
         * @param {string} carrier_id - ShipEngine given carrier id
         * @param {number} dollar_amount - Dollar amount of funds to add (in USD); 
         * @returns {Promise} - Returns a JS Promise with an object containing the current balance 
         * the carrier 
         */

    }, {
        key: 'addFundsToCarrier',
        value: function addFundsToCarrier(carrier_id, dollar_amount) {
            // https://docs.shipengine.com/docs/add-funds-to-carrier
            var path = 'carriers/' + carrier_id + '/add_funds';

            var body = {
                currency: "usd",
                amount: dollar_amount
            };

            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.PUT, null, body);

            return this.request(options);
        }
    }]);

    return CarrierEngine;
}(_requestEngine.RequestEngine);

exports.CarrierEngine = CarrierEngine;