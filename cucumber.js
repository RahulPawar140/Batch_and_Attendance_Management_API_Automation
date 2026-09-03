module.exports = {
    default: {
        requireModule: [
            "tsx/cjs"
        ],

        require: [
            "step-definitions/**/*.ts",
            "hooks/**/*.ts"
        ],

        paths: [
            "features/**/*.feature"
        ],

        format: [
            "progress",
            "json:reports/cucumber-report.json"
        ],

        publishQuiet: true
    }
};