import path from 'path';

export default function generatePaths(settings, filename, testName, testModule) {
    const name = testName.replace(/[^a-z0-9]/gi, '-');
    const file = `${filename.replace(/[^a-z0-9]/gi, '-')}.png`;

    return {
        expected: path.join(settings.expectedPath, testModule, name, file),
        actual: path.join(settings.actualPath, testModule, name, file),
        diff: path.join(settings.actualPath, testModule, name, 'diff', file),
    };
}
