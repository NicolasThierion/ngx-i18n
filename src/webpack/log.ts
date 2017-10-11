const chalk = require('chalk');

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
export class Log {
  static info(msg) {
    _log('log', msg, chalk.cyan);
  }
  static success(msg) {
    _log('log', msg, chalk.green);
  }
  static warn(msg) {
    _log('warn', msg, chalk.bgYellow);
  }
  static error(msg) {
    _log('error', msg, chalk.bgRed);
  }
  static debug(msg) {
    _log('debug', msg, chalk.blue);
  }
  static verbose(msg) {
    _log('debug', msg, chalk.blue);
  }
};

function _log(fn, msg, colorFunc) {
    if (typeof(msg) === 'object') {
        for (let item in msg) {
            if (msg.hasOwnProperty(item)) {
                console[fn](colorFunc(msg[item]));
            }
        }
    } else {
        console[fn](colorFunc(msg));
    }
}
