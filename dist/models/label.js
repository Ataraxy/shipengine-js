'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Label = function Label(label) {
  var _this = this;

  _classCallCheck(this, Label);

  // assign passed in details to label object
  Object.keys(label).forEach(function (key) {
    _this[key] = label[key];
  });
};

Label.FORMAT_OPTIONS = {
  PDF: 'pdf',
  ZPL: 'zpl'
};

Label.LAYOUT_OPTIONS = {
  FOUR_BY_SIX: '4x6',
  LETTER: 'letter'
};

Label.STATUS_OPTIONS = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  ERROR: 'error',
  VOIDED: 'voided'
};

exports.Label = Label;