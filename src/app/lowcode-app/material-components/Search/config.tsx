import { Classify } from "@lowcode/types/materials";

export default {
  type: "search",
  name: "搜索框",
  classify: Classify.FORM,
  defaultProps: {
    width: 300,
    options: [{ value: 2, label: "初始化" }],
  },
  setter: [
    {
      name: "placeholder",
      label: "占位内容",
      type: "textarea",
    },
  ],
  events: [
    {
      name: "onSearch",
      label: "搜索事件",
    },
    {
      name: "onChange",
      label: "搜索值变化事件",
    },
  ],
};
