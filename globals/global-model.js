const Account = require('../models/Account');
const Report = require('../models/Report');
const Server = require('../models/Server');

exports.initGlobalModels = () => {
  global.Account = Account;
  global.Report = Report;
  global.Server = Server;
};
