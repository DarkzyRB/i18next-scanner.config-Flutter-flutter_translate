const fs = require("fs");
const path = require('path')

module.exports = {
    input: [
        'lib/**/*.{ts,dart}',

        '!dist/**',
        '!i18n/**',
        '!android/**',
        '!ios/**',
        '!assets/**',
        '!build/**',
        '!packages/**',
        '!test/**',
        '!**/node_modules/**',
        '!.idea/**',
        '!.dart_tool/**',
    ],
    output: "./",
    options: {
        removeUnusedKeys: true,
        sort: true,
        func: {
            list: ["i18next.t", "translate"],
            extensions: ['dart'],
        },
        lngs: ['en', 'es'],
        defaultLng: 'en',
        defaultValue: '',
        resource: {
            loadPath: "assets/i18n/{{lng}}.json",
            savePath: "assets/i18n/{{lng}}.json",
            jsonIndent: 4,
            lineEnding: "\n",
        },
        keySeparator: ".",
        pluralSeparator: "_",
        contextSeparator: "_",
        contextDefaultValues: [],
        interpolation: {
            prefix: "{{",
            suffix: "}}",
        },
    },
    transform: function customTransform(file, enc, done) {
        "use strict";
        const parser = this.parser;
        const content = fs.readFileSync(file.path, enc);
        const { base, ext } = path.parse(file.path);

        if (['.dart'].includes(ext)) {
            parser.parseTransFromString(content);
            parser.parseFuncFromString(content);
        }

        done();
    }
}
