const reportRepo = require('../responsitories/report-responsitory');
const serverRepo = require('../responsitories/server-responsitory');

exports.getReportByServer = () => {
  // Todo
};

exports.addReportForServer = (dataReq, callback) => {
  // Attach data to get server, get log
  const responseTimeArr = [];
  const data = JSON.parse(dataReq);
  const { logs, serverId } = data;
  const requestNumber = logs.length;
  const connectionNumber = parseInt(data.connection, 10);
  let errorNumber = 0;

  const logFormatArr = logs.map((log) => {
    // Processing data, use pooling
    const responseTime = Math.round(parseFloat(log['response-time']) * 1000);
    if (log.status !== '200') {
      errorNumber += 1;
    }
    responseTimeArr.push(responseTime);
    return formatLog(data, log);
  });
  const responseTimeMedium =
    Math.round(responseTimeArr.reduce((a, b) => a + b) / responseTimeArr.length);

  const reportData = {
      server_id: serverId,
      request_number: requestNumber,
      response_time: responseTimeMedium,
      error_number: errorNumber,
      connection_number: connectionNumber,
    };
  reportRepo.addReportForServer(reportData, (responseData) => {
    callback(logFormatArr);
  });



  // Promise.all(serverPromiseList).then((logFormat) => {
  //   logFormatArr.push(formatLog());
    // Add report to database
    // const reportData = {
    //   server_id: serverId,
    //   request_number: requestNumber,
    //   response_time: responseTimeMedium,
    //   error_number: errorNumber,
    //   connection_number: connectionNumber,
    // };
    // callback(logFormatArr);
    // reportRepo.addReportForServer(reportData, (responseData) => {
    //   callback(logStringArr);
    // });
  // }).catch((err) => {
  //   console.log(err.message);
  // });
};

exports.deleteReportByTime = () => {
  // Todo
};

function formatLog(server, log) {
  const serverName = server.serverName;
  const serverIp = server.serverIp;
  const method = log.method;
  const status = log.status;
  const path = log.url;
  const responseTime = Math.round(log['response-time'] * 1000);
  const contentLength = log.res;
  return {
    serverName,
    serverIp,
    method,
    status,
    path,
    responseTime,
    contentLength,
  };
}


