import { Classify } from "@lowcode/types/materials";

export default {
  name: "容器",
  type: "container",
  classify: Classify.CONTAINER,
  setter: [
    {
      name: "text",
      label: "默认文本",
      type: "input",
    },
    {
      name: "isFlex",
      label: "是否是flex布局",
      type: "switch",
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
};
