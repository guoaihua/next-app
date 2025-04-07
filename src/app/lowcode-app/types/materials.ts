export enum Classify {
  /** 基础组件 */
  BASE = "base",
  /** 容器组件 */
  CONTAINER = "container",
  /** 表单组件 */
  FORM = "form",
  /** 布局组件 */
  LAYOUT = "layout",
  /** 展示组件 */
  DISPLAY = "display",
  /** 功能组件 */
  FUNCTION = "function",
}

export interface ComponentConfig {
  /** 组件名称 */
  name: string;
  /** 唯一值 */
  type: string;
  /** 分类 */
  classify?: Classify;
  component: any;
  /** 组件默认属性 */
  defaultProps?: Record<string, any>;
  /** 组件属性 */
  setter?: ComponentSetter[];
  /** 样式属性 */
  stylesSetter?: ComponentSetter[];
  /** 组件事件 */
  events?: ComponentEvent[];
  /** 组件方法 */
  methods?: ComponentMethods[];
}

export interface ComponentSetter {
  /** 组件属性名称， 存储值 */
  name: string;
  /** 组件属性标题 */
  label: string;
  /** 展示属性的表单类型 */
  type: string;
  /** 表单props */
  props?: Record<string, any>;
}

export interface ComponentEvent {
  /** react 绑定的事件名： onClick */
  name: string;
  /** 事件标题 */
  label: string;
}

export interface ComponentMethods {
  /** 方法名称,自定义方法名*/
  name: string;
  /** 方法标题 */
  label: string;
}
