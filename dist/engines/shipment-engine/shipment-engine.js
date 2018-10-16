'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShipmentEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestEngine = require('../../request-engine');

var _shipment = require('../../models/shipment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Models
// const Address = require('../../models/address'); 


var ShipmentEngine = function (_RequestEngine) {
    _inherits(ShipmentEngine, _RequestEngine);

    function ShipmentEngine() {
        var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, ShipmentEngine);

        return _possibleConstructorReturn(this, (ShipmentEngine.__proto__ || Object.getPrototypeOf(ShipmentEngine)).call(this, api_key));
    }

    /**
     * Creates given shipments in ShipEngine system
     * 
     * @param {Shipment[]} - Array of shipment Objects (following shipment class format) to create
     * @returns {Promise} - JS Promise wrapped around object containing an array of created shipments
     */


    _createClass(ShipmentEngine, [{
        key: 'createShipments',
        value: function createShipments(shipments) {
            // https://docs.shipengine.com/docs/create-multiple-shipments

            // TODO Evaluate if this step is necessary
            // Properly format shipment objects
            var formattedShipments = shipments.map(function (shipment) {
                return new _shipment.Shipment(shipment);
            });

            var path = 'shipments';
            var body = {
                shipments: formattedShipments
            };
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Create a shipment in the ShipEngine system
         * 
         * @param {Shipment} shipment - Object description of shipment (Follows Shipment Class format) to create
         * @returns {Promise} - JS Promise wrapped around object containing an array with the created shipment
         */

    }, {
        key: 'createShipment',
        value: function createShipment(shipment) {
            // https://docs.shipengine.com/docs/create-a-shipment

            return this.createShipments([shipment]);
        }

        /**
         * Updates a shipment described in object, with given shipment_id, in the ShipEngine system. 
         * 
         * @param {Shipment} shipment - Object description of shipment to update (follows Shipment class format)
         * @param {string} shipment.shipment_id - ShipEngine assigned shipment id
         * @returns {Promise} - JS Promise wrapped around object containing the updated shipment 
         */

    }, {
        key: 'updateShipment',
        value: function updateShipment(shipment) {
            // https://docs.shipengine.com/docs/update-a-shipment

            var formattedShipment = new _shipment.Shipment(shipment);

            var path = 'shipments/' + shipment.shipment_id;
            var body = formattedShipment;
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.PUT, null, body);

            return this.request(options);
        }

        /**
         * Retrieves the shipment with the given shipment id
         * 
         * @param {string} shipment_id - ShipEngine id for a shipment
         * @returns {Promise} - JS Promise with an object containing the given shipment
         */

    }, {
        key: 'getShipment',
        value: function getShipment(shipment_id) {
            // https://docs.shipengine.com/docs/get-a-shipment-by-id

            var path = 'shipments/' + shipment_id;
            var options = this.generateOptions(path);

            return this.request(options);
        }

        /**
         * Retrieves the shipment with the given external id
         * 
         * @param {string} external_shipment_id - Externally assigned shipment id
         * @returns {Promise} - JS Promise with an object containing the given shipment
         */

    }, {
        key: 'getShipmentByExternalID',
        value: function getShipmentByExternalID(external_shipment_id) {
            // https://docs.shipengine.com/docs/get-a-shipment-by-key

            var path = 'shipments/external_shipment_id/' + external_shipment_id;
            var options = this.generateOptions(path);

            return this.request(options);
        }

        /**
         * Retrieve shipments matching given query parameters
         * 
         * @param {Object} [query_parameters] - Object of parameters to use in query
         * @param {string} [query_parameters.batch_id] - Batch id to match against
         * @param {string} [query_parameters.tag] - shipment tag to match against
         * @param {string} [query_parameters.shipment_status] - shipment status to match against (one of Shipment.STATUS_OPTIONS)
         * @param {string} [query_parameters.modified_at_start] - beginning modified date to match shipments against (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {string} [query_parameters.modified_at_end] - end modified date to match shipments against (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {string} [query_parameters.created_at_start] - beginning created date to match shipments against (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {string} [query_parameters.created_at_end] - end created date to match shipments against (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {number} [query_parameters.page] - page number of query results to retrieve 
         * @param {number} [query_parameters.page_size] - size of page of a given page to retrieve
         * @param {string} [query_parameters.sort_dir] - sort direction for results (either "asc" or "desc")
         * @param {string} [query_parameters.sort_by] - sorting field (either "modified_at" or "created_at")
         */

    }, {
        key: 'queryShipments',
        value: function queryShipments() {
            var query_parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { page_size: 1 };

            // https://docs.shipengine.com/docs/query-shipments

            var path = 'shipments';
            var params = query_parameters;
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.GET, params);

            return this.request(options);
        }

        /**
         * Adds a tag to the shipment with the given id
         * 
         * @param {string} shipment_id - ShipEngine assigned shipment id
         * @param {string} tag_name - name of tag to add to shipment
         * @returns {Promise} - JS promise with an object containing the shipment id and assigned tags
         */

    }, {
        key: 'tagShipment',
        value: function tagShipment(shipment_id, tag_name) {
            // https://docs.shipengine.com/docs/tag-a-shipment

            var path = 'shipments/' + shipment_id + '/tags/' + tag_name;
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST);

            return this.request(options);
        }

        /**
         * Removes a tag to the shipment with the given id
         * 
         * @param {string} shipment_id - ShipEngine assigned shipment id
         * @param {string} tag_name - name of tag to remove to shipment
         * @returns {Promise} - JS promise with an empty object
         */

    }, {
        key: 'removeTagFromShipment',
        value: function removeTagFromShipment(shipment_id, tag_name) {
            // https://docs.shipengine.com/docs/remove-a-shipment-tag

            var path = 'shipments/' + shipment_id + '/tags/' + tag_name;
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.DELETE);

            return this.request(options);
        }

        /**
         * Get rates for a given shipment
         * 
         * @param {Shipment} shipment - Shipment to get rates for (follows Shipment class format)
         * @param {Object} rate_options - Object of options to consider for rates
         * @param {string[]} rate_options.carrier_ids - list of carrier ids to get rates for
         */

    }, {
        key: 'getRates',
        value: function getRates(shipment, rate_options) {
            // https://docs.shipengine.com/docs/get-shipping-rates

            var path = 'rates';
            var body = {
                shipment: shipment,
                rate_options: rate_options
            };
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
        * Creates a tag with the given name
        * 
        * @param {string} tag_name - name of tag to create
        * @returns {Promise} - JS Promise wrapped around object containing created tag
        */

    }, {
        key: 'createTag',
        value: function createTag(tag_name) {
            // https://docs.shipengine.com/docs/create-a-tag

            var path = 'tags/' + tag_name;
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST);

            return this.request(options);
        }

        /**
         * Deletes the given tag
         * 
         * @param {string} tag_name - name of tag to delete
         * @returns {Promise} - JS Promise wrapped around an empty object
         */

    }, {
        key: 'deleteTag',
        value: function deleteTag(tag_name) {
            // https://docs.shipengine.com/docs/delete-a-tag

            var path = 'tags/' + tag_name;
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.DELETE);

            return this.request(options);
        }

        /**
         * List all current tags
         * 
         * @returns {Promise} - JS Promise wrapped around object containing array of tags
         */

    }, {
        key: 'listTags',
        value: function listTags() {
            // https://docs.shipengine.com/docs/list-all-tags

            var path = 'tags';
            var options = this.generateOptions(path);

            return this.request(options);
        }

        /**
         * 
         * @param {string} tag_name - old tag name to replace
         * @param {string} new_tag_name - new tag name to use
         * @returns {Promise} - JS Promise wrapped around empty object
         */

    }, {
        key: 'renameTag',
        value: function renameTag(tag_name, new_tag_name) {
            // https://docs.shipengine.com/docs/rename-a-tag

            var path = 'tags/' + tag_name + '/' + new_tag_name;
            var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.PUT);

            return this.request(options);
        }
    }]);

    return ShipmentEngine;
}(_requestEngine.RequestEngine);

exports.ShipmentEngine = ShipmentEngine;