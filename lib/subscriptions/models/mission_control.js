const moment = require('moment');
const assert = require('assert');
const Mission = require('../models/mission');

var MissionControl = function(args) {
  assert(args.db, 'Need a DB instance');
  this.db = args.db;
};

MissionControl.prototype.currentMission = function(next) {
  var nextMission = moment().add(1, 'month').startOf('month');
  var formattedMissionDate = nextMission.format('MM-DD-YYYY');
  var self = this;
  this.db.getMissionByLaunchDate(formattedMissionDate, function(err, foundMission) {
    assert.ok(err === null, err);
    if(foundMission) {
      next(null, new Mission(foundMission));
    } else {
      foundMission = new Mission();
      self.db.createNextMission(foundMission, function(err, result) {
        next(err, foundMission);
      });
    }
  });
};

MissionControl.prototype.hasSpaceForRole = function(role, next) {
  this.currentMission(function(err, mission) {
    var hasRoom = mission.needsRole(role);
    next(null, hasRoom);
  });
};

module.exports = MissionControl;
