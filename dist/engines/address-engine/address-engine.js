var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { RequestEngine } from '../../request-engine';

// Models
// const Address = require('../../models/address'); 

var AddressEngine = function (_RequestEngine) {
    _inherits(AddressEngine, _RequestEngine);

    function AddressEngine() {
        var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, AddressEngine);

        return _possibleConstructorReturn(this, (AddressEngine.__proto__ || Object.getPrototypeOf(AddressEngine)).call(this, api_key));
    }

    /**
     * Finds properly formatted versions of the given addresses
     * 
     * @param {Address[]} - Array of Addresses to validate (follows Address class format)
     * @returns {Promise} - JS Promise wrapped around object containing array of validated addresses
     */


    _createClass(AddressEngine, [{
        key: 'validateAddresses',
        value: function validateAddresses(addresses) {
            // https://docs.shipengine.com/docs/address-validation

            var path = 'addresses/validate';
            var body = addresses;
            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Gets a properly formatted version of the given address
         * 
         * @param {Address} address - Address to validate (follows Address class format)
         * @returns {Promise} - JS Promise wrapped around object containing an array with the formatted address
         */

    }, {
        key: 'validateAddress',
        value: function validateAddress(address) {
            // https://docs.shipengine.com/docs/address-validation

            return this.validateAddresses([address]);
        }
    }]);

    return AddressEngine;
}(RequestEngine);

export { AddressEngine };