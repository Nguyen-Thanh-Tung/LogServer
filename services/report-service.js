const reportRepo = require('../responsitories/report-responsitory');
const serverRepo = require('../responsitories/server-responsitory');

exports.getReportByServer = () => {
  // Todo
};

exports.addReportForServer = (dataReq, callback) => {
  // Attach data to get server, get log
  let logStringArr = [];
  const responseTimeArr = [];
  const data = JSON.parse(dataReq);
  const logs = data.logs;
  const requestNumber = logs.length;
  const serverId = data.server_id;
  const connectionNumber = parseInt(data.connection, 10);
  let errorNumber = 0;
  const serverPromiseList = [];
  logs.forEach((log) => {
    // Processing data, use pooling
    const responseTime = parseFloat(log['response-time']) * 1000;
    if (log.status !== '200') {
      errorNumber += 1;
    }
    const serverPromise = serverRepo.getServerDetail(serverId).then((server) => {
      return createLogString(server, log);
    });
    serverPromiseList.push(serverPromise);
    responseTimeArr.push(responseTime);
  });
  const responseTimeMedium =
    Math.round(responseTimeArr.reduce((a, b) => a + b) / responseTimeArr.length);
  Promise.all(serverPromiseList).then((logStrings) => {
    logStringArr = logStrings;
    // Add report to database
    const reportData = {
      server_id: serverId,
      request_number: requestNumber,
      response_time: responseTimeMedium,
      error_number: errorNumber,
      connection_number: connectionNumber,
    };
    callback(logStringArr);
    // reportRepo.addReportForServer(reportData, (responseData) => {
    //   callback(logStringArr);
    // });
  }).catch((err) => {
    console.log(err.message);
  });
};

exports.deleteReportByTime = () => {
  // Todo
};


// Function
function createLogString(server, log) {
  const serverName = server.server_name;
  const serverIp = server.server_ip;
  const method = log.method;
  const status = log.status;
  const path = log.url;
  const responseTime = log['response-time'] * 1000;
  const contentLength = log.res;
  return `${serverName} ${serverIp} ${method} ${path} ${status} ${responseTime} ms - ${contentLength}`;
}

