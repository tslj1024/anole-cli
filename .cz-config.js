module.exports = {
    types: [
        {
            value: ':sparkles: feature',
            name: 'feature:     新增功能 ✨ | A new feature',
        },
        { value: ':bug: fix', name: 'fix:      修复缺陷 🐛 | A bug fix' },
        {
            value: ':pencil2: docs',
            name: 'docs:     文档更新 ✏️ | Documentation only changes',
        },
        {
            value: ':art: style',
            name: 'style:    代码格式 🎨 | Changes that do not affect the meaning of the code',
        },
        {
            value: ':zap: perf',
            name: 'perf:     性能提升 ⚡ | A code change that improves performance',
        },
        {
            value: ':recycle: refactor',
            name: 'refactor: 代码重构 ♻ | A code change that neither fixes a bug nor adds a feature',
        },
        {
            value: ':test_tube: test',
            name: 'test:     测试相关 🧪 | Adding missing tests or correcting existing tests',
        },
        {
            value: ':tada: chore',
            name: 'chore:    其他修改 🎉 | Other changes that do not modify src or test files',
        },
        {
            value: ':rewind: revert',
            name: 'revert:   回退代码 ⏪️ | Revert to a commit',
        },
        {
            value: ':package: build',
            name: 'build:    构建相关 📦️ | Changes that affect the build system or external dependencies',
        },

        {
            value: ':green_heart: ci',
            name: 'ci:       持续集成 💚 | Changes to our CI configuration files and scripts',
        },
    ],
    // override the messages, defaults are as follows
    messages: {
        type: '请选择提交类型:',
        customScope: '请输入您修改的范围(可选):',
        subject: '请简要描述提交 message (必填):',
        body: '请输入详细描述(可选，待优化去除，跳过即可):',
        footer: '请输入要关闭的issue(待优化去除，跳过即可):',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
    },
    allowCustomScopes: true,
    skipQuestions: ['body', 'footer'],
    subjectLimit: 72,
};
