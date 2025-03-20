import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
          // 调整 React Hooks 规则级别为 warn
          "react-hooks/exhaustive-deps": "warn",
          "react-hooks/rules-of-hooks": "warn",
          "@typescript-eslint/no-unused-expressions": "'warn"
    }
  }
];

export default eslintConfig;
