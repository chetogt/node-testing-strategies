const assert = require('assert');
const Assignment = require('../models/assignment');
const Mission = require('../models/mission');
const Helpers = require('./helpers');
const goodSpecs = {age: 40, height: 60, weight: 190};
const _ = require('underscore')._;

describe('Assignments', () => {
  describe('Commander with valid app', () => {
    var assignment;
    before(() => {
      assignment = new Assignment({
        passenger: goodSpecs,
        mission: new Mission({id: 1000}),
        role: 'commander'
      });
    });

    it('compatible', () => {
      assert(assignment.passengerIsCompatible);
    });
  });

  describe('Commander overweight', () => {
    var assignment;
    before(() => {
      assignment = new assert({
        passenger: {weight: 300},
        mission: new Mission({id: 1000}),
        role: 'commander'
      });
    });
    it('no compatibility', () => {
      assert(!assignment.passengerIsCompatible);
    });
  });

  describe('Commander too tall', () => {
    var assignment;
    before(() => {
      assignment = new assert({
        passenger: {height: 300},
        mission: new Mission({id: 1000}),
        role: 'commander'
      });
    });
    it('no compatibility', () => {
      assert(!assignment.passengerIsCompatible);
    });
  });
});
