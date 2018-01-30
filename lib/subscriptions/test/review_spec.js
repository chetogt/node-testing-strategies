const assert = require('assert');
const ReviewProcess = require('../processes/review');
const Helpers = require('./helpers');
const sinon = require('sinon');
const DB = require('../db');
const Mission = require('../models/mission');

describe('The review process', () => {
  describe('Receiving a valid application', () => {
    var decision;
    var validApplication = Helpers.validApplication;
    var review;
    before((done) => {
      var db = Helpers.stubDb();
      sinon.stub(db, 'saveAssignment').yields(null, {saved: true});
      review = new ReviewProcess({application: validApplication, db: db});
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
});
