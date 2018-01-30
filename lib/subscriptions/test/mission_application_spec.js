const assert = require('assert');
const Helpers = require('./helpers');
const MembershipApplication = require('../models/membership_application');

describe('Membership application requirements', () => {
  var validApplication;

  before(() => {
    validApplication = Helpers.validApplication;
  });

  describe('Application valid if...', () => {
    it('all validators successful', () => {
      assert(validApplication.isValid(), 'Not valid');
    });
  });
  describe('Application invalid if...', () => {
    it('is expired', () => {
      var app = new MembershipApplication({validUntil: Date.parse('01/01/2010')});
      assert(app.expired());
    });

    it('email is 4 characters or less', () => {
      var app = new MembershipApplication({email: 'dd'});
      assert(!app.emailIsValid());
    });
    it('email does not contain an @', () => {
      var app = new MembershipApplication({email: 'dd.sds:sd'});
      assert(!app.emailIsValid());
    });
    it('email is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.emailIsValid());
    });
    it('height is less than 60 inches', () => {
      var app = new MembershipApplication({height: 50});
      assert(!app.heightIsValid());
    });
    it('height is more than 75 inches', () => {
      var app = new MembershipApplication({height: 80});
      assert(!app.heightIsValid());
    });
    it('height is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.heightIsValid());
    });
    it('age is less than 15', () => {
      var app = new MembershipApplication({age: 14});
      assert(!app.ageIsValid());
    });
    it('age is more than 100', () => {
      var app = new MembershipApplication({age: 105});
      assert(!app.ageIsValid());
    });
    it('age is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.ageIsValid());
    });
    it('weight is less than 100', () => {
      var app = new MembershipApplication({weight: 90});
      assert(!app.weightIsValid());
    });
    it('weight is more than 180', () => {
      var app = new MembershipApplication({weight: 205});
      assert(!app.weightIsValid());
    });
    it('weight is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.weightIsValid());
    });
    it('first is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
    it('last is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
  });
});
