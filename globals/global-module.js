const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname.replace('/globals', ''), '.env') });
const constants = require('../constants/constants');

exports.initGlobalModules = () => {
  global.express = express;
  global.mongoose = mongoose;
  global.constants = constants;
  global.dotenv = dotenv;
};
