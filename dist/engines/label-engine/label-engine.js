'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestEngine = require('../../request-engine');

var _label = require('../../models/label');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Models
// const Address = require('../../models/address');


var LabelEngine = function (_RequestEngine) {
  _inherits(LabelEngine, _RequestEngine);

  function LabelEngine() {
    var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, LabelEngine);

    return _possibleConstructorReturn(this, (LabelEngine.__proto__ || Object.getPrototypeOf(LabelEngine)).call(this, api_key));
  }

  /**
     * Create label for the given shipment
     *
     * @param {Shipment} shipment - Shipment to create label for (follows Shipment class format)
     * @param {string} shipment.service_code - service code to use to create label
     * @param {Address} shipment.ship_to - Destination address of shipment (follows Address class format)
     * @param {Address} shipment.ship_from - Origin address for shipment (follows Address class format)
     * @param {Package[]} shipment.packages - Array of packages in shipment to create label for (follows Package class format)
     * @param {string} [label_format = null] - The Format the label should be created in (one of Label.FORMAT_OPTIONS)
     * @param {string} [label_layout = null] - The layout the label should be created in (one of Label.LAYOUT_OPTIONS)
     * @param {Boolean} [is_return_label = false] - Whether the label is a return label. Default is false.
     * @param {Boolean} [test_label = false] - Whether the label is a test label. Default is false.
     * @returns {Promise} - JS promise wrapped around object describing the label
    */


  _createClass(LabelEngine, [{
    key: 'createLabel',
    value: function createLabel(shipment) {
      var label_format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var label_layout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var is_return_label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var test_label = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      // https://docs.shipengine.com/docs/quickstart-create-a-label

      var path = 'labels';
      var body = {
        shipment: shipment
      };

      if (label_format) body.label_format = label_format;
      if (label_layout) body.label_layout = label_layout;
      if (is_return_label) body.is_return_label = is_return_label;
      if (test_label) body.test_label = test_label;

      if (this.dev_mode) body.test_label = true;

      var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST, null, body);

      return this.request(options);
    }

    /**
       * Creates a label from a previously created rate.
       *
       * @param {string} rate_id - Rate id previously created from a shipment
       * @param {string} [label_format = null] - The Format the label should be created in (one of Label.FORMAT_OPTIONS)
       * @param {string} [label_layout = null] - The layout the label should be created in (one of Label.LAYOUT_OPTIONS)
       * @param {Boolean} [is_return_label = false] - Whether the label is a return label. Default is false.
       * @param {Boolean} [test_label = false] - Whether the label is a test label. Default is false.
       * @returns {Promise} - JS Promise wrapped around an object containing information about the created label
       */

  }, {
    key: 'createLabelFromRate',
    value: function createLabelFromRate(rate_id) {
      var label_format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var label_layout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var is_return_label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var test_label = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      // https://docs.shipengine.com/docs/use-a-rate-to-print-a-label

      var path = 'labels/rates/' + rate_id;
      var body = {};

      if (label_format) body.label_format = label_format;
      if (label_layout) body.label_layout = label_layout;
      if (is_return_label) body.is_return_label = is_return_label;
      if (test_label) body.test_label = test_label;
      if (this.dev_mode) body.test_label = true;

      var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST, body);

      return this.request(options);
    }

    /**
       * Creates a label from from a shipment id.
       *
       * @param {string} shipment_id - ShipEngine assigned shipment id
       * @param {string} [label_format = null] - The Format the label should be created in (one of Label.FORMAT_OPTIONS)
       * @param {string} [label_layout = null] - The layout the label should be created in (one of Label.LAYOUT_OPTIONS)
       * @param {Boolean} [is_return_label = false] - Whether the label is a return label. Default is false.
       * @param {Boolean} [test_label = false] - Whether the label is a test label. Default is false.
       * @returns {Promise} - JS Promise wrapped around an object containing information about the created label
       */

  }, {
    key: 'createLabelFromShipment',
    value: function createLabelFromShipment(shipment_id) {
      var label_format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var label_layout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var is_return_label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var test_label = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      // https://docs.shipengine.com/docs/use-a-shipment-to-print-a-label

      var path = 'labels/shipment/' + shipment_id;
      var body = {};

      if (label_format) body.label_format = label_format;
      if (label_layout) body.label_layout = label_layout;
      if (is_return_label) body.is_return_label = is_return_label;
      if (test_label) body.test_label = test_label;
      if (this.dev_mode) body.test_label = true;

      var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.POST, null, body);

      return this.request(options);
    }

    /**
       * Retrieve labels matching given query parameters
       *
       * @param {Object} [query_parameters] - Object of parameters to use in query
       * @param {string} [query_parameters.label_status] - label status to match against (one of Label.STATUS_OPTIONS)
       * @param {string} [query_parameters.carrier_id] - Carrier id to filter labels
       * @param {string} [query_parameters.service_code] - Carrier service code to filter labels
       * @param {string} [query_parameters.tracking_number] - Tracking numbers to filter labels
       * @param {string} [query_parameters.batch_id] - Batch id to match against
       * @param {string} [query_parameters.warehouse_id] - Warehouse id ot filter labels
       * @param {string} [query_parameters.created_at_start] - beginning created date to match labels against (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
       * @param {string} [query_parameters.created_at_end] - end created date to match labels against (formatted as YYYY-MM-DDTHH:mm:ss.sssZ)
       * @param {number} [query_parameters.page] - page number of query results to retrieve
       * @param {number} [query_parameters.page_size] - size of page of a given page to retrieve
       * @param {string} [query_parameters.sort_dir] - sort direction for results (either "asc" or "desc")
       * @param {string} [query_parameters.sort_by] - sorting field (either "modified_at" or "created_at")
       * @returns {Promise} - JS Promised wrapped around an object with an array of matching labels
       */

  }, {
    key: 'queryLabels',
    value: function queryLabels() {
      var query_parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { label_status: _label.Label.STATUS_OPTIONS.COMPLETED, page_size: 1 };

      // https://docs.shipengine.com/docs/query-labels

      var path = 'labels';
      var params = query_parameters;
      var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.GET, params);

      return this.request(options);
    }

    /**
       * Voids a label from use
       *
       * @param {string} label_id - ID of label to void
       * @returns {Promise} - JS Promise wrapped around object containing approval and message
       */

  }, {
    key: 'voidLabel',
    value: function voidLabel(label_id) {
      // https://docs.shipengine.com/docs/void-a-label

      var path = 'labels/' + label_id + '/void';
      var body = null; // NOTE: Should body be '' instead?

      var options = this.generateOptions(path, _requestEngine.RequestEngine.HTTPS_METHODS.PUT, null, body);

      return this.request(options);
    }
  }]);

  return LabelEngine;
}(_requestEngine.RequestEngine);

exports.LabelEngine = LabelEngine;