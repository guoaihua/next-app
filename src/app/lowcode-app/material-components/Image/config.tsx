import { Classify, ComponentConfig } from "@lowcode/types/materials";

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
  stylesSetter: [
    { name: "width", label: "图片宽度", type: "input" },
    { name: "height", label: "图片高度", type: "input" },
  ],
} as Omit<ComponentConfig, "component">;
