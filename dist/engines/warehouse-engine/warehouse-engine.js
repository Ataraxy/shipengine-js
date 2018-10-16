var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { RequestEngine } from '../../request-engine';

// Models
// const Address = require('../../models/address'); 

var WarehouseEngine = function (_RequestEngine) {
    _inherits(WarehouseEngine, _RequestEngine);

    function WarehouseEngine() {
        var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, WarehouseEngine);

        return _possibleConstructorReturn(this, (WarehouseEngine.__proto__ || Object.getPrototypeOf(WarehouseEngine)).call(this, api_key));
    }

    /**
     * Create a warehouse with given information
     * 
     * @param {string} name - Name of warehouse to create
     * @param {Address} origin_address - Address of the warehouse (follows Address class format)
     * @param {Address} return_address - Address to return products to (follows Address class format)
     * @returns {Promise} - JS Promise wrapped around object describing warehouse
     */


    _createClass(WarehouseEngine, [{
        key: 'createWarehouse',
        value: function createWarehouse(name, origin_address, return_address) {
            // https://docs.shipengine.com/docs/create-a-warehouse

            var path = 'warehouses';

            var body = {
                name: name,
                origin_address: origin_address,
                return_address: return_address
            };

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Updates existing warehouse with given information
         * 
         * @param {Object} warehouse - Object describing warehouse to update
         * @param {string} warehouse.warehouse_id - id of warehouse to update
         * @param {string} warehouse.name - name to update warehouse with
         * @param {Address} warehouse.origin_address - origin address to update warehouse with (follows Address class format)
         * @param {Address} warehouse.return_address - return address to update warehouse with (follows Address class format)
         */

    }, {
        key: 'updateWarehouse',
        value: function updateWarehouse(warehouse) {
            // https://docs.shipengine.com/docs/update-a-warehouse
            var path = 'warehouses/' + warehouse.warehouse_id;
            var body = warehouse;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.PUT, null, body);

            return this.request(options);
        }

        /**
         * Retrieves a list of current warehosues
         * 
         * @returns {Promise} - JS Promise wrapped around an object contianing an array of warehouses
         */

    }, {
        key: 'listWarehouses',
        value: function listWarehouses() {
            // https://docs.shipengine.com/docs/list-warehouses

            var path = 'warehouses';
            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.GET);

            return this.request(options);
        }

        /**
         * Retrieves information about the warehouse with the given id
         * @param {string} warehouse_id - ShipEngine assigned warehouse id
         * @returns {Promise} - JS Promise wrapped around object containing information about the warehouse
         */

    }, {
        key: 'getWarehouse',
        value: function getWarehouse(warehouse_id) {
            // https://docs.shipengine.com/docs/get-a-warehouse

            var path = 'warehouses/' + warehouse_id;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.GET);

            return this.request(options);
        }

        /**
         * Deletes warehouse with the given id
         * 
         * @param {string} warehouse_id - ShipEngine assigned warehouse_id to delete
         * @returns {Promise} - JS Promise wrapped around an empty object
         */

    }, {
        key: 'deleteWarehouse',
        value: function deleteWarehouse(warehouse_id) {
            // https://docs.shipengine.com/docs/delete-a-warehouse

            var path = 'warehouses/' + warehouse_id;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.DELETE);

            return this.request(options);
        }

        /**
         * Creates a manifest for the given warehouse and carrier
         * 
         * @param {string} carrier_id - ShipEngine assigned carrier id for manifest
         * @param {string} warehouse_id - ShipEngine assigned warehouse id for manifest
         * @param {string} ship_date - shipment date for query in manifest (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {string[]} [excluded_label_ids=null] - list of label (ids) to exclude from manifest
         * @returns {Promise} - JS Promise wrapped around object with information about the created manifest
         */

    }, {
        key: 'createManifest',
        value: function createManifest(carrier_id, warehouse_id, ship_date) {
            var excluded_label_ids = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            // https://docs.shipengine.com/docs/understand-and-create-manifests
            var path = 'manifests';

            var body = {
                carrier_id: carrier_id,
                warehouse_id: warehouse_id
            };

            if (ship_date) body.ship_date = ship_date;
            if (excluded_label_ids) body.excluded_label_ids = excluded_label_ids;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Retrieve list of manifests matching query parameters
         * 
         * @param {Object} query_parameters - Object describing manifest query
         * @param {string} query_parameters.warehouse_id - ShipEngine assigned warehouse id to get manifests for
         * @param {string} query_parameters.carrier_id - Carrier id to list manifests for
         * @param {string} [query_parameters.ship_date_start] - Start date for shipments to consider (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {string} [query_parameters.ship_date_end] - End date for shipments to consider (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {string} [query_parameters.create_date_start] - Start date for manifests to consider (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {string} [query_parameters.create_date_end] - End date for manifests to consider (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @returns {Promise} - JS Promise wrapped around object containing an array of manifest objects
         */

    }, {
        key: 'listManifests',
        value: function listManifests(query_parameters) {
            // https://docs.shipengine.com/docs/list-manifests
            var path = 'manifests';
            var params = query_parameters;
            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.GET, params);

            return this.request(options);
        }

        /**
         * Retrieves information about manifest with the given id
         * 
         * @param {string} manifest_id - ShipEngine assigned manifest id to retrieve
         * @returns {Promise} - JS Promise wrapped around project with information about the manifest
         */

    }, {
        key: 'getManifest',
        value: function getManifest(manifest_id) {
            // https://docs.shipengine.com/docs/get-a-manifest

            var path = 'manifests/' + manifest_id;
            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.GET);

            return this.request(options);
        }
    }]);

    return WarehouseEngine;
}(RequestEngine);

export { WarehouseEngine };