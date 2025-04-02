import { Classify } from "@lowcode/types/materials";

export default {
  name: "卡片",
  type: "card",
  classify: Classify.DISPLAY,
  setter: [
    {
      name: "title",
      label: "卡片标题",
      type: "input",
    },
    {
      name: "hoverable",
      label: "鼠标移入悬浮",
      type: "switch",
    },
  ],
};
