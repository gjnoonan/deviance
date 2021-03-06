'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function getEnvironment(processArgs = process.argv) {
    const envFlags = ['-e', '--env'];
    const envIndex = processArgs.findIndex(arg => envFlags.includes(arg)) + 1;

    return envIndex > 0 && envIndex < processArgs.length ? processArgs[envIndex] : 'default';
}

function hasProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
}

exports.hasProperty = hasProperty;
exports.getEnvironment = getEnvironment;