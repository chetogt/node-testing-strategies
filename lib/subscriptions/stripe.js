const Billing = require('./processes/billing');
const billing = new Billing({stripeKey: "sk_test_XZXX"});

billing.createSubscription({
  email: 'alexander.brown@example.com',
  name: 'Jose Cordova',
  // plan: 'customer',
  card: {
    name: 'Alexander Brown',
    number: '4242424242424242',
    exp_month: 10,
    exp_year: 2019
  }
}, function(err, customer) {
  console.log(err);
  console.log(customer);
});
