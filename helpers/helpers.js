const bcrypt = require('bcrypt-nodejs');

const { mongoose, constants } = global;
exports.connectDatabase = () => {
  mongoose.connect(process.env.DB_URL, {
    useMongoClient: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, constants.error.connectDB));
};
exports.generateHashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
exports.validPassword =
  (reqPassword, hashPassword) => bcrypt.compareSync(reqPassword, hashPassword);

