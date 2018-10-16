'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address =
/**
   *
   * @param {string} name - name of person/business associated with address
   * @param {string} city_locality - city for address
   * @param {string} state_province - state for address (formatted as two character abbreviation (TX))
   * @param {string} postal_code - postal code for address
   * @param {string} country_code - country code for address (formatted as two character abbreviation (US))
   * @param {string} address_line1 - Street address
   * @param {string} [address_line2=''] - Street address (optional)
   * @param {string} [phone=''] - Phone for address (optional)
   * @param {string} [company_name=''] - Company name for address (optional)
   * @param {string} [address_residential_indicator='no'] - Indicates of address is residential (options are "no" or "yes")
   */
function Address(name, city_locality, state_province, postal_code, country_code, address_line1) {
  var address_line2 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
  var phone = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
  var company_name = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '';
  var address_residential_indicator = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 'no';

  _classCallCheck(this, Address);

  // TODO reevaluate how parameters are passed to create address
  this.name = name;
  if (phone.length) this.phone = phone;
  if (company_name.length) this.company_name = company_name;
  this.address_line1 = address_line1;
  if (address_line2.length) this.address_line2 = address_line2;
  this.city_locality = city_locality;
  this.state_province = state_province;
  this.postal_code = postal_code;
  this.country_code = country_code;
  this.address_residential_indicator = address_residential_indicator;
};

Address.VALIDATION_OPTIONS = {
  NO_VALIDATION: 'no_validation',
  VALIDATE_ONLY: 'validate_only',
  VALIDATE_AND_CLEAN: 'validate_and_clean'
};

Address.MESSAGES = {
  a1001: 'The country is not supported.',
  a1002: 'Parts of the address could not be verified.',
  a1003: 'Some fields were modified while verifying the address.',
  a1004: 'The address was found but appears incomplete.',
  a1005: 'The address failed pre-validation.'
};

exports.Address = Address;