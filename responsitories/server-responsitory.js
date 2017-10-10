const { Server } = global;

exports.getServerDetail = serverId => Server.findById(serverId).exec();
