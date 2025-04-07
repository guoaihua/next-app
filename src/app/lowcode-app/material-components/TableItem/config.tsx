import { Classify, ComponentConfig } from "@lowcode/types/materials";

export default {
  name: "表格选项",
  type: "tableItem",
  classify: Classify.FORM,
  defaultProps: {
    dataIndex: `col_${new Date().getTime()}`,
    title: "列名",
  },
  setter: [
    {
      name: "title",
      label: "标题",
      type: "input",
    },
    {
      name: "dataIndex",
      label: "字段",
      type: "input",
    },
    {
      name: "type",
      label: "类型",
      type: "select",
      props: {
        options: [
          { label: "文本", value: "text" },
          { label: "数字", value: "number" },
          { label: "日期", value: "date" },
        ],
      },
    },
  ],
} as Omit<ComponentConfig, "component">;
