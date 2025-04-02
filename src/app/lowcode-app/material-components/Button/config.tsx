import { Classify } from "@lowcode/types/materials";

export default {
  name: "按钮",
  type: "button",
  classify: Classify.BASE,
  setter: [
    {
      name: "type",
      label: "按钮类型",
      type: "select",
      props: {
        options: [
          { label: "主按钮", value: "primary" },
          { label: "次按钮", value: "default" },
        ],
      },
    },
    {
      name: "text",
      label: "文本",
      type: "input",
    },
  ],
  stylesSetter: [
    {
      name: "width",
      label: "宽度",
      type: "inputNumber",
    },
    {
      name: "height",
      label: "高度",
      type: "inputNumber",
    },
  ],
  events: [
    {
      name: "onClick",
      label: "点击事件",
    },
    {
      name: "onDoubleClick",
      label: "双击事件",
    },
  ],
};
