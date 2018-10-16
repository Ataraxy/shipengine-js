function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Batch = function Batch(batch) {
  var _this = this;

  _classCallCheck(this, Batch);

  // assign passed in details to batch object
  Object.keys(batch).forEach(function (key) {
    _this[key] = batch[key];
  });
};

Batch.STATUS_OPTIONS = {
  OPEN: 'open',
  QUEUED: 'queued',
  COMPLETED: 'completed',
  PROCESSING: 'processing',
  ARCHIVED: 'archived',
  INVALID: 'invalid',
  COMPLETED_WITH_ERRORS: 'completed_with_errors'
};

export { Batch };