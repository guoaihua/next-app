import { Classify } from "@lowcode/types/materials";

export default {
  name: "图片",
  type: "image",
  classify: Classify.FUNCTION,
  setter: [
    {
      name: "imageSrc",
      label: "图片链接",
      type: "input",
    },
  ],
};
