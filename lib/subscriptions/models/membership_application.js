const _ = require('underscore')._;
const moment = require('moment');

var MembershipApplication = function (args) {
  args || (args = {});
  _.extend(this, args);

  this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, 'days');

  this.expired = function () {
    return this.validUntil.isBefore(moment());
  };

  this.emailIsValid = function () {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
  };

  this.heightIsValid = function () {
    return this.height && this.height > 60 && this.height < 75;
  };

  this.ageIsValid = function () {
    return this.age && this.age < 100 && this.age > 15;
  };

  this.weightIsValid = function () {
    return this.weight && this.weight > 100 && this.weight < 180;
  };

  this.nameIsValid = function () {
    return this.first && this.last;
  };

  this.validationMessage = function () {
    if (this.isValid()) {
      return 'Application is valid';
    } else if (!this.emailIsValid()){
      return 'Email is invalid';
    } else if (!this.agelIsValid()){
      return 'Age is invalid';
    } else if (!this.heightIsValid()){
      return 'Height is invalid';
    } else if (!this.weightIsValid()){
      return 'Weight is invalid';
    } else if (!this.nameIsValid()){
      return 'Name is invalid';
    } else if (this.expired()){
      return 'This application is expired';
    }
  };

  this.isValid = function () {
    return this.emailIsValid() &&
      this.heightIsValid() &&
      this.ageIsValid() &&
      this.weightIsValid() &&
      this.nameIsValid() &&
      !this.expired();
  };
};

module.exports = MembershipApplication;
