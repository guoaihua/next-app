module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 自定义规则（可选）
    "type-enum": [
      2, // 强制级别为 error
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "revert",
        "ci",
        "perf",
      ],
    ],
    "header-max-length": [2, "always", 72], // 标题最多72字符
    "subject-case": [2, "always", "lower-case"], // 标题小写
  },
};
