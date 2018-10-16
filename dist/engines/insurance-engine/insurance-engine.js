'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InsuranceEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestEngine = require('../../request-engine');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InsuranceEngine = function (_RequestEngine) {
    _inherits(InsuranceEngine, _RequestEngine);

    function InsuranceEngine() {
        var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, InsuranceEngine);

        return _possibleConstructorReturn(this, (InsuranceEngine.__proto__ || Object.getPrototypeOf(InsuranceEngine)).call(this, api_key));
    }

    /**
     * Adds funds to ShipEngine insurance
     * 
     * @param {number} dollar_amount - The dollar amount to add to insurance balance
     * @return {Promise} - JS Promise wrapped around object containing current insurance balance
     */


    _createClass(InsuranceEngine, [{
        key: 'addFundsToInsurance',
        value: function addFundsToInsurance(dollar_amount) {
            // https://docs.shipengine.com/docs/adding-funds-to-insurance

            var path = 'insurance/shipsurance/add_funds';
            var body = {
                currency: "usd",
                amount: dollar_amount
            };
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.PATCH, null, body);

            return this.request(options);
        }

        /**
         * Get current ShipEngine insurance balance
         * 
         * @return {Promise} - JS Promise wrapped around object containing current insurance balance
         */

    }, {
        key: 'getInsuranceBalance',
        value: function getInsuranceBalance() {
            // https://docs.shipengine.com/docs/get-insurance-balance

            var path = 'insurance/shipsurance/balance';
            var options = this.generateOptions(path);

            return this.request(options);
        }
    }]);

    return InsuranceEngine;
}(_requestEngine.RequestEngine);

exports.InsuranceEngine = InsuranceEngine;