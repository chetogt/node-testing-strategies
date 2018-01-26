const assert = require('assert');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');
const sinon = require('sinon');

describe('The review process', () => {
  describe('Receiving a valid application', () => {
    var decision;
    var validApplication = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 170
    });
    var review = new ReviewProcess();
    // var spy = sinon.spy(review, 'ensureAppValid');
    // cuando se usan eventos
    var validationSpy = sinon.spy();
    var missionSpy = sinon.spy();
    var roleAvailableSpy = sinon.spy();
    var roleCompatibleSpy = sinon.spy();
    before((done) => {
      // cuando se usan eventos
      review.on('validated', validationSpy);
      review.on('mission-selected', missionSpy);
      review.on('role-available', roleAvailableSpy);
      review.on('role-compatible', roleCompatibleSpy);

      review.processApplication(validApplication, function (err, result) {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });
    it('ensures validation was called', () => {
      assert(validationSpy.called);
    });
    it('ensures mission was called', () => {
      assert(missionSpy.called);
    });
    it('ensures roleAvailable was called', () => {
      assert(roleAvailableSpy.called);
    });
    it('ensures roleCompatible was called', () => {
      assert(roleCompatibleSpy.called);
    });
  });
});
