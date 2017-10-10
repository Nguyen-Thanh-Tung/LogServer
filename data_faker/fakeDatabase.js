const faker = require('faker');
const async = require('async');

require('../globals/global-module').initGlobalModules();
require('../globals/global-model').initGlobalModels();
const helpers = require('../helpers/helpers');

const {
  Account, Server, Report, constants, mongoose,
} = global;
helpers.connectDatabase();

const accounts = [];
const servers = [];
const numAccount = 10;
const numServer = 500;
const numReport = 1000;

function createAccount(accountParams, callback) {
  const accountDetail = {
    username: accountParams[0],
    password: accountParams[1],
    access_token: accountParams[2],
  };

  const account = new Account(accountDetail);
  account.save((err) => {
    if (err) {
      console.log(`${constants.error.add.account} ${err.message}`);
    } else {
      accounts.push(account);
      callback(null, 'createAccount');
    }
  });
}
function createServer(serverParams, callback) {
  const serverDetail = {
    account_id: serverParams[0],
    server_name: serverParams[1],
    domain: serverParams[2],
    server_ip: serverParams[3],
    port: serverParams[4],
    description: serverParams[5],
  };

  const server = new Server(serverDetail);
  server.save((err) => {
    if (err) {
      console.log(`${constants.error.add.server} ${err.message}`);
    } else {
      servers.push(server);
      callback(null, 'createServer');
    }
  });
}
function createReport(reportParams, callback) {
  const reportDetail = {
    server_id: reportParams[0],
    request_number: reportParams[1],
    response_time: reportParams[2],
    error_number: reportParams[3],
    connection_number: reportParams[4],
  };

  const report = new Report(reportDetail);
  report.save((err) => {
    if (err) {
      console.log(`${constants.error.add.report} ${err.message}`);
    } else {
      callback(null, 'createReport');
    }
  });
}

function fakeAccount(cb) {
  async.parallel([
    function(callback) {
      const username = faker.name.findName;
      const password = helpers.generateHashPassword('123456');
      const accessToken = faker.lorem.sentence();
      const accountParams = [
        username,
        password,
        accessToken,
      ];

      createAccount(accountParams, callback);
    },
  ], cb);
}
let count = 0;
function fakeServer(cb) {
  count += 1;
  async.parallel([
    function(callback) {
      const accountId = accounts[randomInt(0, accounts.length - 1)];
      const serverName = `Server ${count}`;
      const domain = faker.internet.domainName();
      const serverIp = faker.internet.ip();
      const port = randomInt(3000, 4000);
      const description = faker.lorem.paragraph();
      const serverParams = [
        accountId,
        serverName,
        domain,
        serverIp,
        port,
        description,
      ];

      createServer(serverParams, callback);
    },
  ], cb);
}
function fakeReport(cb) {
  async.parallel([
    function(callback) {
      const serverId = servers[randomInt(0, servers.length - 1)];
      const requestNumber = randomInt(20, 30);
      const responseTime = randomInt(10, 100);
      const errorNumber = randomInt(0, 5);
      const connectionNumber = randomInt(1, 4);
      const reportParams = [
        serverId,
        requestNumber,
        responseTime,
        errorNumber,
        connectionNumber,
      ];

      createReport(reportParams, callback);
    },
  ], cb);
}

function deleteAllAccount(cb) {
  Account.remove({}, (err) => {
    if (err) {
      console.log(constants.error.delete.account);
    } else {
      console.log(constants.success.delete.account);
    }
    cb(null, 'deleteAllAccount');
  });
}
function deleteAllServer(cb) {
  Server.remove({}, (err) => {
    if (err) {
      console.log(constants.error.delete.server);
    } else {
      console.log(constants.success.delete.server);
    }
    cb(null, 'deleteAllServer');
  });
}
function deleteAllReport(cb) {
  Report.remove({}, (err) => {
    if (err) {
      console.log(constants.error.delete.report);
    } else {
      console.log(constants.success.delete.report);
    }
    cb(null, 'deleteAllReport');
  });
}
function deleteAllDocument(cb) {
  async.series([
    deleteAllReport,
    deleteAllServer,
    deleteAllAccount,
  ], (err) => {
    if (err) {
      console.log(constants.error.delete.all);
    } else {
      console.log(constants.success.delete.all);
    }
    cb(null, 'deleteAllDocument');
  });
}

const asyncAll = [deleteAllDocument];
for (let i = 0; i < numAccount; i += 1) {
  asyncAll.push(fakeAccount);
}
for (let i = 0; i < numServer; i += 1) {
  asyncAll.push(fakeServer);
}
for (let i = 0; i < numReport; i += 1) {
  asyncAll.push(fakeReport);
}

function setTokenAccount(cb) {
  // Todo
  cb(null, 'setTokenAccount');
}
asyncAll.push(setTokenAccount);
async.series(
  asyncAll,
  (err) => {
    if (err) {
      console.log(constants.error.add.all);
    } else {
      console.log('Fake data done');
    }
    mongoose.connection.close();
  },
);

function randomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
