module.exports = {
  messages: {
    type: '选择你要提交的类型 :',
    scope: '选择一个提交范围（可选）:',
    customScope: '请输入自定义的提交范围 :',
    subject: '填写简短精炼的变更描述 :\n',
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
    breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
    footerPrefixesSelect: '选择关联issue前缀（可选）:',
    customFooterPrefix: '输入自定义issue前缀 :',
    footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
    confirmCommit: '是否提交或修改commit ?'
  },
  types: [
    {
      value: 'feat',
      emoji: ':sparkles:',
      name: 'feat:     新增功能 | A new feature'
    },
    {
      value: 'fix',
      emoji: ':bug:',
      name: 'fix:      修复缺陷 | A bug fix'
    },
    {
      value: 'docs',
      emoji: ':memo:',
      name: 'docs:     文档更新 | Documentation only changes'
    },
    {
      value: 'style',
      emoji: 'lipstick',
      name: 'style:    代码格式 | Changes that do not affect the meaning of the code'
    },
    {
      value: 'refactor',
      emoji: ':recycle:',
      name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'perf',
      emoji: ':zap:',
      name: 'perf:     性能提升 | A code change that improves performance'
    },
    {
      value: 'test',
      emoji: ':white_check_mark:',
      name: 'test:     测试相关 | Adding missing tests or correcting existing tests'
    },
    {
      value: 'build',
      emoji: ':package:',
      name: 'build:    构建相关 | Changes that affect the build system or external dependencies'
    },
    {
      value: 'ci',
      emoji: ':ferris_wheel:',
      name: 'ci:       持续集成 | Changes to our CI configuration files and scripts'
    },
    {
      value: 'revert',
      emoji: ':hammer:',
      name: 'revert:   回退代码 | Revert to a commit'
    },
    {
      value: 'chore',
      emoji: ':rewind:',
      name: 'chore:    其他修改 | Other changes that do not modify src or test files'
    }
  ],
  useEmoji: true,
  emojiAlign: 'left',
  scopes: ['site', 'util', 'script', 'tool'],
  scopeFilters: ['__tests__', '_util'],
  maxHeaderLength: 100,
  allowEmptyIssuePrefix: false,
  allowCustomIssuePrefix: false
};
