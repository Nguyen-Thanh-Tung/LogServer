const { Report } = global;

exports.getReportByServer = (serverId, startTime, endTime) => Report.find({
  server_id: serverId,
}).where('created_at').gt(startTime).lt(endTime)
  .exec();

exports.addReportForServer = (reportData, callback) => {
  const report = new Report(reportData);
  report.save((err) => {
    if (err) {
      // console.log(err.message);
      callback(err.message);
    } else {
      // console.log('suc');
      callback('success');
    }
  });
};

