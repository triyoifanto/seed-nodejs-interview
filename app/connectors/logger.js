/**
 *
 * general logging facility
 *
 * you should use this when you want to push something
 * into logs that isn't emitted by the server, for example:
 *
 * requests made by this server instance together with it's replies
 * and errors are ALL logged by it's default logger 'good'.
 *
 * So, if you need to track, for instance, a correlation id through your
 * logs, you'd be using this logger.
 *
 * You can find docs for the below, here: https://github.com/trentm/node-bunyan
 */

const bunyan = require('bunyan');
const pkg = require('../../package.json');

const { name } = pkg;

const logger = bunyan.createLogger({
  name,
  level: 'error'
});

module.exports = logger;
