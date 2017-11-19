const reportRepo = require('../responsitories/report-responsitory');

exports.addReportForServer = (dataReq, callback) => {
  // Attach data to get server, get log
  const responseTimeArr = [];
  const data = JSON.parse(dataReq);
  const { logs, serverId } = data;
  const requestNumber = logs.length;
  const connectionNumber = 1;
  let errorNumber = 0;

  const logFormatArr = logs.map((log) => {
    // Processing data, use pooling
    const responseTime = log.responseTime;
    if (log.status !== '200') {
      errorNumber += 1;
    }
    responseTimeArr.push(responseTime);
    return null;
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
    // console.log(responseData);
    callback(null);
  });
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

