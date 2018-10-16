var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { RequestEngine } from '../../request-engine';

// Models
// const Label = require('../../models/label'); 

var BatchEngine = function (_RequestEngine) {
    _inherits(BatchEngine, _RequestEngine);

    function BatchEngine() {
        var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, BatchEngine);

        return _possibleConstructorReturn(this, (BatchEngine.__proto__ || Object.getPrototypeOf(BatchEngine)).call(this, api_key));
    }

    /**
     * Creates a batch with the given shipments
     * 
     * @param {Object} batch - Object describing batch to create
     * @param {string[]} batch.shipment_ids - Array of strings of shipment ids to add to batch
     * @param {string} [batch.batch_notes] - Batch notes
     * @param {string} [batch.external_batch_id] - externally assigned batch id
     * @param {string[]} [batch.rate_ids=[]] - array of rate ids to use for batch
     * @returns {Promise} - JS Promise wrapped around object describing batch
     */


    _createClass(BatchEngine, [{
        key: 'createBatch',
        value: function createBatch(batch) {
            // https://docs.shipengine.com/docs/create-a-batch

            var path = 'batches';

            var body = {
                shipment_ids: batch.shipment_ids
            };

            if (batch.batch_notes) body.batch_notes = batch.batch_notes;

            if (batch.external_batch_id) body.external_batch_id = batch.external_batch_id;

            if (batch.rate_ids) body.rate_ids = batch.rate_ids;else body.rate_ids = [];

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Add shipments to an already existing batch
         * 
         * @param {Object} batch - Object describing the batch
         * @param {string} batch.batch_id - ShipEngine assigned batch id to add to
         * @param {string[]} batch.shipment_ids - List of ShipEngine assigned shipment ids to add to batch
         * @param {string[]} [rate_ids=[]] - array of rate ids to use for batch
         * @returns {Promise} - JS Promise wrapped around an empty object
         */

    }, {
        key: 'addToBatch',
        value: function addToBatch(batch) {
            // https://docs.shipengine.com/docs/add-to-a-batch

            var path = 'batches/' + batch.batch_id + '/add';

            var body = {
                shipment_ids: batch.shipment_ids
            };

            if (batch.rate_ids) body.rate_ids = batch.rate_ids;else body.rate_ids = [];

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Processes a batch of shipments to create labels for them
         * 
         * @param {stirng} batch_id - assigned batch id for shipments
         * @param {string} ship_date - date shipments should be shipped on (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
         * @param {string} [label_format = null] - The Format the label should be created in (one of Label.FORMAT_OPTIONS)
         * @param {string} [label_layout = null] - The layout the label should be created in (one of Label.LAYOUT_OPTIONS)
         * @returns {Promise} - JS Promise wrapped around an empty object
         */

    }, {
        key: 'processBatch',
        value: function processBatch(batch_id, ship_date) {
            var label_format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var label_layout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            // https://docs.shipengine.com/docs/batch-create-labels

            var path = 'batches/' + batch_id + '/process/labels';

            // TODO determine if ship_date is required or optional
            var body = {
                ship_date: ship_date
            };
            if (label_format) body.label_format = label_format;
            if (label_layout) body.label_layout = label_layout;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Retrieves information about batch with the given id
         * 
         * @param {string} batch_id - assigned batch id
         * @returns {Promise} - JS Promise wrapped around object containing information about the batch
         */

    }, {
        key: 'getBatch',
        value: function getBatch(batch_id) {
            // https://docs.shipengine.com/docs/get-a-batch

            var path = 'batches/' + batch_id;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.GET);

            return this.request(options);
        }

        /**
         * Retrieves information about hte batch with the given external id
         * 
         * @param {string} external_batch_id - externally assigned batch id
         * @returns {Promise} - JS Promise wrapped aroudn object containing information about the batch
         */

    }, {
        key: 'getBatchByExternalID',
        value: function getBatchByExternalID(external_batch_id) {
            // https://docs.shipengine.com/docs/get-a-batch-by-key

            var path = 'batches/external_batch_id/' + external_batch_id;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.GET);

            return this.request(options);
        }

        /**
         * Retrieves list of errors associated with a given batch
         * 
         * @param {string} batch_id - ShipEngine assigned batch id
         * @returns {Promise} - JS Promise wrapped around object containing an array of errors
         */

    }, {
        key: 'listBatchErrors',
        value: function listBatchErrors(batch_id) {
            // https://docs.shipengine.com/docs/list-batch-errors

            var path = 'batches/' + batch_id + '/errors';

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.GET);

            return this.request(options);
        }

        /**
         * Remove shipments from an existing batch
         * 
         * @param {Object} batch - Object describing the batch
         * @param {string} batch.batch_id - ShipEngine assigned batch id to remove from
         * @param {string[]} batch.shipment_ids - List of ShipEngine assigned shipment ids to remove from batch
         * @param {string[]} [rate_ids=[]] - array of rate ids
         * @returns {Promise} - JS Promise wrapped around an empty object
         */

    }, {
        key: 'removeFromBatch',
        value: function removeFromBatch(batch) {
            // https://docs.shipengine.com/docs/remove-from-a-batch

            var path = 'batches/' + batch.batch_id + '/remove';

            var body = {
                shipment_ids: batch.shipment_ids,
                rate_ids: batch.rate_ids
            };

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.POST, null, body);

            return this.request(options);
        }

        /**
         * Retrieve batches matching given query parameters
         * 
         * @param {Object} [query_parameters] - Object of parameters to use in query
         * @param {string} [query_parameters.status] - label status to match against (one of Batch.STATUS_OPTIONS)
         * @param {number} [query_parameters.page] - page number of query results to retrieve 
         * @param {number} [query_parameters.page_size] - size of page of a given page to retrieve
         * @param {string} [query_parameters.sort_dir] - sort direction for results (either "asc" or "desc")
         * @param {string} [query_parameters.sort_by] - sorting field (either "ship_date" or "processed_at")
         * @returns {Promise} - JS Promised wrapped around an object with an array of matching batches
         */

    }, {
        key: 'queryBatches',
        value: function queryBatches() {
            var query_parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { page_size: 1 };

            // https://docs.shipengine.com/docs/list-batches

            var path = 'batches';
            var params = query_parameters;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.GET, params);

            return this.request(options);
        }

        /**
         * Archives (delets) the given batch
         * 
         * @param {string} batch_id - ShipEngine assigned batch id
         * @returns {Promise} - JS Promise wrapped around an empty object
         */

    }, {
        key: 'archiveBatch',
        value: function archiveBatch(batch_id) {
            // https://docs.shipengine.com/docs/delete-a-batch

            var path = 'batches/' + batch_id;

            var options = this.generateOptions(path, RequestEngine.HTTPS_METHODS.PUT);

            return this.request(options);
        }
    }]);

    return BatchEngine;
}(RequestEngine);

export { BatchEngine };