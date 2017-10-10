const reportService = require('../services/report-service');

exports.getReportByServer = (req, res) => {
  // Todo
};

exports.addReportForServer = (req, res) => {
  // Get data from agent
  const data = req.body;
  reportService.addReportForServer(data, (responseData) => {
    console.log(responseData);
    res.send('ok');
  });
};

