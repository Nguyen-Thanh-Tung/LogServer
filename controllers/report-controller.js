const reportService = require('../services/report-service');

exports.getReportByServer = (req, res) => {
  // Todo
};
let count = 0;
exports.addReportForServer = (req, res) => {
  // Get data from agent
  const data = req.body;
  reportService.addReportForServer(data, (responseData) => {
    console.log(responseData);
    res.send('ok');
  });
};

