import { Component } from "@/app/lowcode-app/types/component";
// 根据Id查找元素
export const getElementById = (
  components: Component[],
  id: number,
): Component | undefined => {
  if (!components || !id) {
    return;
  }
  console.log("components", components);
  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    const result = getElementById(component.children, id);
    if (result) {
      return result;
    }
  }
};
