import { Component } from "@/app/lowcode-app/types/component";
import { useGlobalStore } from "@render-core/stores/globalStore";

const parseExpression = (expr: string, compoent: Component) => {
  const {
    getCurrentComponentData,
    components,
    getCurrentComponentDataByUplevel,
  } = useGlobalStore.getState();
  // 匹配 $this.name 或 $global.name 或 $parent.$parent.name
  // 多层级时，忽略多层的$parent，只解析最后一层的$parent， 根据数量计算层级
  const pattern = /(?:\$(this|global|father)\.)+([\w.]+)/g;
  //解析四种场景
  // $this.name
  // $global.name
  // $parent..name
  // $parent.parent.name

  // 兼容components还未初始化场景
  if (!components.length) return expr;
  let isNeedParse = false;
  const res = expr.replace(pattern, (_, type, path) => {
    let dataSource;
    try {
      switch (type) {
        case "this":
          const thisState = getCurrentComponentData?.(compoent?.id);
          dataSource = thisState;
          break;
        case "global":
          const globalState = getCurrentComponentData?.(components[0]?.id);
          dataSource = globalState;
          break;
        case "father":
          // 统计expr中$father的个数
          const fatherCount = expr.match(/\$father/g)?.length || 0;
          dataSource = getCurrentComponentDataByUplevel(compoent, fatherCount);
          break;
        default:
          break;
      }

      // 超出限制，则返回空字符串
      // return path.split(".").reduce((acc, key) => acc?.[key] || '', dataSource ?? {});
      const res = findPath(dataSource, path) as any;

      // 如果dataSource是对象，则返回值需要解析
      if (typeof res === "object") {
        isNeedParse = true;
      }

      return typeof res === "object" ? JSON.stringify(res) : res;
    } catch (error) {
      console.error("解析表达式错误", error);
      return "";
    }
  });

  console.log("解析表达式", expr, res);

  return isNeedParse ? JSON.parse(res) : res;
};

// 动态属性解析器
export const resolveDynamicProps = (props: Record<string, any>, component) => {
  if (!props) {
    return;
  }
  // const obj = Object.entries(props).reduce(
  //   (acc, [key, value]) => {
  //     if (typeof value === "string" && value.includes("$")) {
  //       acc[key] = parseExpression(value, component);
  //     } else {
  //       acc[key] = value;
  //     }
  //     return acc;
  //   },
  //   {} as Record<string, any>,
  // );

  // 遍历props，解析动态属性, 根据值是否包含$来判断是否为动态属性
  const obj = Object.entries(props)?.reduce(
    (acc, [key, value]) => {
      if (typeof value === "string" && value.includes("$")) {
        acc[key] = parseExpression(value, component);
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  console.log("动态解析后的props", obj);

  return obj;
};

const findPath = <T = unknown>(
  obj: Record<string, any>,
  path: string,
): T | undefined => {
  if (!obj || typeof path !== "string") return undefined;

  return path.split(".").reduce((acc, key) => {
    return acc?.[key];
  }, obj);
};

const generateObjByPath = (
  obj: Record<string, any>,
  path: string,
  value,
): Record<string, any> => {
  if (!obj || typeof path !== "string") return obj;

  const keys = path.split(".");
  // 递归生成对象;
  const res = keys.reduceRight((acc, key) => {
    return { [key]: acc };
  }, value);

  return res;
};
