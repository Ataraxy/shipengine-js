'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestEngine = function () {
    function RequestEngine() {
        var api_key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, RequestEngine);

        this.api_key = api_key ? api_key : process.env.SHIPENGINE_API_KEY;
        this.dev_mode = false;

        if (process.env.SHIPENGINE_DEV_MODE && process.env.SHIPENGINE_DEV_MODE.toLowerCase() === 'true') {
            this.dev_mode = true;
        }

        this.base_url = 'https://api.shipengine.com/v1/';
        this.request = _requestPromiseNative2.default;
    }

    _createClass(RequestEngine, [{
        key: 'generateOptions',
        value: function generateOptions(path) {
            var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RequestEngine.HTTPS_METHODS.GET;
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            var options = {
                method: method,
                uri: '' + this.base_url + path,
                headers: {
                    "Content-type": "application/json",
                    "api-key": this.api_key
                },
                json: true
            };

            if (params) Object.keys(params).forEach(function (key, index) {
                if (index === 0) options.uri += '?';else options.uri += '&';
                options.uri += key + '=' + params[key];
            });

            if (body) options.body = body;

            return options;
        }
    }]);

    return RequestEngine;
}();

RequestEngine.HTTPS_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};

exports.RequestEngine = RequestEngine;