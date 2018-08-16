import assertion from '../../src/assertions/elementRegresses';

const ElementRegresses = assertion.assertion;

let instance;
let result;
describe('Given ElementRegresses', () => {
    beforeAll(() => {
        instance = new ElementRegresses(undefined, undefined, 0.1);
    });

    it('Then is a class', () => {
        expect(instance).toBeInstanceOf(ElementRegresses);
    });

    it('Then it implements a method "value"', () => {
        expect(instance).toHaveProperty('value');
        expect(typeof instance.value).toEqual('function');
    });

    it('Then it implements a method "command"', () => {
        expect(instance).toHaveProperty('command');
        expect(typeof instance.command).toEqual('function');
    });

    it('Then it implements a method "pass"', () => {
        expect(instance).toHaveProperty('pass');
        expect(typeof instance.pass).toEqual('function');
    });

    describe('When no selector passed', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 0.1);
        });

        it('Then selector uses default value', () => {
            expect(instance.selector).toBe('body');
        });

        it('Then filename uses default value', () => {
            expect(instance.filename).toBe('body');
        });

        it('Then message is as expected', () => {
            expect(instance.message).toContain('Deviance regression (pass): <body> comparison passed');
        });
    });
});

describe('Given ElementRegression.value', () => {
    describe('When it is provided with a parameter with property "message"', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 0.1);
            result = instance.value({ message: 'I am a message' });
        });

        it('Then its string representation equals the property "message"', () => {
            expect(result.toString()).toEqual('I am a message');
        });
    });

    describe('When it is provided with a parameter without property "message"', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 0.1);
            result = instance.value({ notMessage: 'I am not a message' });
        });

        it('Then its string representation equals the property "message"', () => {
            expect(result.toString()).toEqual('[object Object]');
        });
    });
});

describe('Given ElementRegression.command', () => {
    describe('When it is called', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 0.1);
            instance.api = {
                captureElementScreenshot: jest.fn(),
            };
            instance.command();
        });

        it('Then captureElementScreenshot has been called once', () => {
            expect(instance.api.captureElementScreenshot).toHaveBeenCalledTimes(1);
        });
    });
});

describe('Given ElementRegression.pass', () => {
    describe('When checking with new element', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 0.1);
            const data = {
                actual: {
                    path: 'output/deviance/regression/actual/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 1280,
                    height: 960,
                },
            };
            result = instance.pass(data);
        });

        it('Then message is set to "new element" text', () => {
            expect(instance.message).toBe('Deviance regression (new): <body> recognised as new regression element');
        });

        it('Then should pass', () => {
            expect(result).toBe(true);
        });
    });

    describe('When checking element with different dimensions', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 0.1);
            const data = {
                actual: {
                    path: 'output/deviance/regression/actual/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 100,
                    height: 100,
                },
                expected: {
                    path: 'regression/expected/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 1280,
                    height: 960,
                },
            };
            result = instance.pass(data);
        });

        it('Then message is set to "changed dimensions" text', () => {
            expect(instance.message).toBe('Deviance regression (fail): <body> has changed dimensions');
        });

        it('Then should fail', () => {
            expect(result).toBe(false);
        });
    });

    describe('When checking with an invalid threshold', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 'bob');
            const data = {
                actual: {
                    path: 'output/deviance/regression/actual/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 1280,
                    height: 960,
                },
                expected: {
                    path: 'regression/expected/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 1280,
                    height: 960,
                },
                diff: {
                    path: 'output/deviance/regression/actual/default/groupA/basicTest/Squirrel-test/diff/img.png',
                    percent: 0,
                },
            };
            result = instance.pass(data);
        });

        it('Then the expected should be "Requires number between 0 and 1"', () => {
            expect(instance.expected).toBe('Requires number between 0 and 1');
        });

        it('Then message is set to "threshold is not within required range" text', () => {
            expect(instance.message).toBe('Deviance regression (fail): The supplied threshold parameter is not between 0 and 1');
        });

        it('Then should fail', () => {
            expect(result).toBe(false);
        });
    });

    describe('When checking element that fails comparison', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 0.1);
            const data = {
                actual: {
                    path: 'output/deviance/regression/actual/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 1280,
                    height: 960,
                },
                expected: {
                    path: 'regression/expected/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 1280,
                    height: 960,
                },
                diff: {
                    path: 'output/deviance/regression/actual/default/groupA/basicTest/Squirrel-test/diff/img.png',
                    percent: 10,
                },
            };
            result = instance.pass(data);
        });

        it('Then message is set to "comparison failed" text', () => {
            expect(instance.message).toBe('Deviance regression (fail): <body> comparison failed');
        });

        it('Then should fail', () => {
            expect(result).toBe(false);
        });
    });

    describe('When checking element that passes comparison', () => {
        beforeAll(() => {
            instance = new ElementRegresses(undefined, undefined, 0.1);
            const data = {
                actual: {
                    path: 'output/deviance/regression/actual/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 1280,
                    height: 960,
                },
                expected: {
                    path: 'regression/expected/default/groupA/basicTest/Squirrel-test/img.png',
                    width: 1280,
                    height: 960,
                },
                diff: {
                    path: 'output/deviance/regression/actual/default/groupA/basicTest/Squirrel-test/diff/img.png',
                    percent: 0,
                },
            };
            result = instance.pass(data);
        });

        it('Then should pass', () => {
            expect(result).toBe(true);
        });
    });
});
