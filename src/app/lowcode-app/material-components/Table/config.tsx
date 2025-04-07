import { Classify, ComponentConfig } from "@lowcode/types/materials";

export default {
  name: "表格",
  type: "table",
  classify: Classify.FORM,
  setter: [
    {
      name: "dataSource",
      label: "数据源",
      type: "input",
    },
  ],
} as Omit<ComponentConfig, "component">;
