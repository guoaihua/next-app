import { Classify } from "@lowcode/types/materials";
export default {
  name: "文本",
  type: "text",
  classify: Classify.DISPLAY,
  setter: [
    {
      name: "text",
      label: "显示内容",
      type: "textarea",
    },
    {
      name: "dynamicText",
      label: "动态插值",
      type: "input",
    },
    {
      name: "textAlign",
      label: "居中方式",
      type: "select",
      props: {
        options: [
          { label: "居中", value: "center" },
          { label: "居左", value: "left" },
          { label: "具右", value: "right" },
        ],
      },
    },
    {
      name: "level",
      label: "标题等级",
      type: "select",
      props: {
        options: [
          { label: "普通文本", value: 0 },
          { label: "一级标题", value: 1 },
          { label: "二级标题", value: 2 },
          { label: "三级标题", value: 3 },
          { label: "四级标题", value: 4 },
          { label: "五级标题", value: 5 },
        ],
      },
    },
    {
      name: "isInline",
      label: "是否内联",
      type: "switch",
    },
    {
      name: "ellipsis",
      label: "是否省略",
      type: "switch",
    },
    {
      name: "row",
      label: "最大显示行数",
      type: "inputNumber",
    },
  ],
};
