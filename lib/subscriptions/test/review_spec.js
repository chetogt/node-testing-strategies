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
    var review = new ReviewProcess({application: validApplication});
    sinon.spy(review, 'ensureAppValid');
    sinon.spy(review, 'findNextMission');
    sinon.spy(review, 'roleIsAvailable');
    sinon.spy(review, 'ensureRoleCompatible');
    before((done) => {
      // cuando se usan eventos
      // review.on('validated', validationSpy);
      // review.on('mission-selected', missionSpy);
      // review.on('role-available', roleAvailableSpy);
      // review.on('role-compatible', roleCompatibleSpy);

      review.processApplication(function (err, result) {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
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
