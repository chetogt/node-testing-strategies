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
  role: 'commander',
  card: 1
});

exports.stubDb = function(args) {
  args || (args = {});
  var mission = args.mission || new Mission();
  var db = new DB();
  sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
  sinon.stub(db, 'createNextMission').yields(null, mission);
  return db;
};

exports.goodStripeArgs = {
  name: 'Test User',
  email: 'test@test.com',
  plan: 'commander',
  card: 1
};

exports.badStripeArgs = {
  name: 'Test User',
  email: 'test@test.com',
  plan: 'commander',
  card: 2
};

exports.goodStripeResponse = function(args) {
  var plan = args.plan || 'commander';

  return { id: 'cus_CEUr8ul70U7S8s',
  object: plan,
  account_balance: 0,
  created: 1517329332,
  currency: null,
  default_source: 'card_1Bq1s8EfiRPCmxZZEkZQCkXZ',
  delinquent: false,
  description: 'Customer for alexander.brown@example.com',
  discount: null,
  email: 'alexander.brown@example.com',
  livemode: false,
  metadata: {},
  shipping: null,
  sources:
   { object: 'list',
     data: [ [Object] ],
     has_more: false,
     total_count: 1,
     url: '/v1/customers/cus_CEUr8ul70U7S8s/sources' },
  subscriptions:
   { object: 'list',
     data: [],
     has_more: false,
     total_count: 0,
     url: '/v1/customers/cus_CEUr8ul70U7S8s/subscriptions' } }
};

exports.badStripeResponse = function() {
  return {
    rawType: 'card-error',
    code: 'card_declined',
    param: undefined,
    message: 'Your card was declined',
    detail: undefined,
    raw: {
      message: 'Your card was declined',
      type: 'card_error',
      code: 'card_declined',
      decline_code: 'generic_decline'
    },
    error: 'Your card was declined',
    type: 'StripeCardError'
  }
}();
