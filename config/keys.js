if (process.env.NODE_ENV === 'production') {
  // return the production set of keys
  module.export = require('./prod');
} else {
  // return development keys
  module.exports = require('./dev');
};
