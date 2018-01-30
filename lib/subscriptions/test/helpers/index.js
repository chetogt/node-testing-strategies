const MembershipApplication = require('../../models/membership_application');
const sinon = require('sinon');
const DB = require('../../db');
const Mission = require('../../models/mission');

exports.validApplication = new MembershipApplication({
  first: 'Test',
  last: 'User',
  email: 'test@test.com',
  age: 30,
  height: 66,
  weight: 170,
  role: 'commander'
});

exports.stubDb = function(args) {
  args || (args = {});
  var mission = args.mission || new Mission();
  var db = new DB();
  sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
  sinon.stub(db, 'createNextMission').yields(null, mission);
  return db;
};
