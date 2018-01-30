const assert = require('assert');
const ReviewProcess = require('../processes/review');
const Helpers = require('./helpers');
const sinon = require('sinon');
const DB = require('../db');
const Mission = require('../models/mission');
const Billing = require('../processes/billing');
const _ = require('underscore')._;
const nock = require('nock');

describe('The review process', () => {
  var db = Helpers.stubDb();
  var billing = new Billing({stripeKey: 'abc'});

  describe('Receiving a valid application', () => {
    var decision;
    var validApplication = Helpers.validApplication;
    var review;
    sinon.stub(db, 'saveAssignment').yields(null, {id: 1});
    before((done) => {
      var goodCall = nock('https://api.stripe.com/v1')
        .post('/customers')
        .reply(200, Helpers.goodStripeResponse);

      review = new ReviewProcess({
        application: validApplication,
        db: db,
        billing: billing
      });
      sinon.spy(review, 'ensureAppValid');
      sinon.spy(review, 'findNextMission');
      sinon.spy(review, 'roleIsAvailable');
      sinon.spy(review, 'ensureRoleCompatible');
      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });
    it('returns an assignment', () => {
      assert(decision.assignment);
    });
    it('returns a subscription', () => {
      assert(decision.subscription);
    });
    it('ensures validation was called', () => {
      assert(review.ensureAppValid.called);
    });
    it('ensures mission was called', () => {
      assert(review.findNextMission.called);
    });
    it('ensures roleAvailable was called', () => {
      assert(review.roleIsAvailable.called);
    });
    it('ensures roleCompatible was called', () => {
      assert(review.ensureRoleCompatible.called);
    });
  });

  describe('Valid application, failed billing', () => {
    var decision;
    var badBillingApp = _.clone(Helpers.validApplication);
    var review;
    badBillingApp.card = 2;
    before((done) => {
      var badCall = nock('https://api.stripe.com/v1')
        .post('/customers')
        .reply(200, Helpers.badStripeResponse);

      review = new ReviewProcess({
        application: badBillingApp,
        db: db,
        billing: billing
      });

      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });
    it('returns false for success', () => {
      assert(!decision.success);
    });
  });
});
