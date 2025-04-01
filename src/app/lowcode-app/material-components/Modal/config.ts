import { Classify } from "@lowcode/types/materials";

export default {
  name: "弹窗",
  type: "modal",
  classify: Classify.FUNCTION,
  methods: [
    {
      name: "open",
      label: "打开弹窗",
    },
    {
      name: "close",
      label: "关闭弹窗",
    },
  ],
};
