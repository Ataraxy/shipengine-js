'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TrackingEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestEngine = require('../../request-engine');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrackingEngine = function (_RequestEngine) {
    _inherits(TrackingEngine, _RequestEngine);

    function TrackingEngine() {
        var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, TrackingEngine);

        return _possibleConstructorReturn(this, (TrackingEngine.__proto__ || Object.getPrototypeOf(TrackingEngine)).call(this, api_key));
    }

    /**
     * Tracks packages by label id
     * 
     * @param {string} label_id - ID of Label to track
     * @returns {Promise} - JS Promise wrapped around object containing tracking information
     */


    _createClass(TrackingEngine, [{
        key: 'trackLabel',
        value: function trackLabel(label_id) {
            // https://docs.shipengine.com/docs/track-a-label

            var path = 'labels/' + label_id + '/track';
            var options = this.generateOptions(path);

            return this.request(options);
        }

        /**
         * Gathes tracking information for given tracking number. Currently only 
         * USPS, Fedex, UPS, and Stamps.com are supported. 
         * 
         * @param {string} carrier_code - carrier code of package to track
         * @param {string} tracking_number - tracking number to gather information for
         * @returns {Promise} - JS Promise wrapped around object containing tracking information
         */

    }, {
        key: 'trackPackage',
        value: function trackPackage(carrier_code, tracking_number) {
            // https://docs.shipengine.com/docs/track-a-package

            var path = 'tracking';
            var params = {
                carrier_code: carrier_code,
                tracking_number: tracking_number
            };
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.GET, params);

            return this.request(options);
        }

        /************************* Webhooks *************************/

        /**
         * Enables webhook to push tracking information for the given 
         * carrier and tracking number
         * 
         * @param {string} carrier_code - carrier code of package to track
         * @param {string} tracking_number - tracking number to receive information for
         * @returns {Promise} - JS Promise wrapped around an empty object
         */

    }, {
        key: 'startTrackingPackage',
        value: function startTrackingPackage(carrier_code, tracking_number) {
            // https://docs.shipengine.com/docs/start-tracking-updates

            var path = 'tracking/start';
            var params = {
                carrier_code: carrier_code,
                tracking_number: tracking_number
            };
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST, params);

            return this.request(options);
        }

        /**
         * Disables webhook sending information for the given tracking number
         * 
         * @param {string} carrier_code - carrier code of package to stop tracking
         * @param {string} tracking_number - tracking number to stop receiving information for
         * @returns {Promise} - JS Promise wrapped around an empty object
         */

    }, {
        key: 'stopTrackingPackage',
        value: function stopTrackingPackage(carrier_code, tracking_number) {
            // https://docs.shipengine.com/docs/stop-tracking-updates

            var path = 'tracking/stop';
            var params = {
                carrier_code: carrier_code,
                tracking_number: tracking_number
            };
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST, params);

            return this.request(options);
        }
    }]);

    return TrackingEngine;
}(_requestEngine.RequestEngine);

exports.TrackingEngine = TrackingEngine;