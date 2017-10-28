const reportService = require('../services/report-service');
exports.getReportByServer = (req, res) => {
  // Todo
};
exports.addReportForServer = (req, res) => {
  // Get data from agent
  const data = req.body.data;

  reportService.addReportForServer(data, (responseData) => {
    if (global.ws) {
      global.ws.send(JSON.stringify(responseData));
    }
  });
  res.send('ok');
};

