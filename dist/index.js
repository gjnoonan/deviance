'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _reporter = require('./reporting/reporter');

var _reporter2 = _interopRequireDefault(_reporter);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultSettings = {
    reporting: {
        enabled: false,
        port: 8083
    },
    regression: {
        expectedPath: 'tests_output/deviance/regression/expected',
        actualPath: 'tests_output/deviance/regression/actual',
        threshold: 0.05
    }
};

module.exports = class Deviance {
    constructor(settings = {}) {
        this.settings = {};

        if (settings.constructor !== Object) {
            this.settings = defaultSettings;
        } else {
            Object.entries(defaultSettings).forEach(([k, v]) => {
                if ((0, _helpers.hasProperty)(settings, k)) {
                    this.settings[k] = Object.assign({}, v, settings[k]);
                } else {
                    this.settings[k] = Object.assign({}, v);
                }
            });
        }

        const env = (0, _helpers.getEnvironment)(process.argv);
        const { expectedPath, actualPath } = this.settings.regression;
        this.settings.regression.expectedPath = _path2.default.join(expectedPath, env);
        this.settings.regression.actualPath = _path2.default.join(actualPath, env);
    }

    reporter(results, done) {
        _reporter2.default.write(results, this.deviance);

        done();
    }
};