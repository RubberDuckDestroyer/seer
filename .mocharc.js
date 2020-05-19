module.exports = {
    diff: true,
    extension: ['ts', 'tsx', 'js', 'jsx'],
    opts: './mocha.opts',
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd'
};