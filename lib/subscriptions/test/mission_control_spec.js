const moment = require('moment');
const assert = require('assert');
const MissionControl = require('../models/mission_control');
const Mission = require('../models/mission');
const DB = require('../db');
const Helpers = require('./helpers');
const sinon = require('sinon');

describe('Mission Planning', () => {
  var missionControl, db;
  before(() => {
    db = Helpers.stubDb();
    missionControl = new MissionControl({db: db});
  });

  describe('No Current Mission', () => {
    var currentMission;
    before((done) => {
      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      });
    });
    it('it is created if none exists', () => {
      assert(currentMission);
      assert(db.getMissionByLaunchDate.called);
    });
  });
  describe('Current Mission Exists', () => {
    var currentMission;
    before((done) => {
      db.getMissionByLaunchDate.restore();
      sinon.stub(db, 'getMissionByLaunchDate').yields(null, {id: 1000});
      missionControl.currentMission((err, res) => {
        currentMission = res;
        done();
      });
    });
    it('it returns mission 1000', () => {
      assert.equal(currentMission.id, 1000);
      assert(db.getMissionByLaunchDate.called);
    });
  });
});
