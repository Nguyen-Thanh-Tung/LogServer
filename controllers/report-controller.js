const reportService = require('../services/report-service');
exports.getReportByServer = (req, res) => {
  // Todo
};
exports.addReportForServer = (req, res) => {
  // Get data from agent
  const data = req.body.data;

  reportService.addReportForServer(data, (responseData) => {
    if (global.ws) {
      for (let i = 0; i < global.ws.length; i += 1) {
        global.ws[i].send(JSON.stringify(responseData));
      }
    }
  });
  res.send('ok');
};

