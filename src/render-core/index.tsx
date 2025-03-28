import { createElement, ReactNode, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { Component } from "@/app/lowcode-app/types/component";
import { getElementById } from "@lowcode/libs/tools";
import { useGlobalStore } from "@render-core/stores/globalStore";
import { ParentDataProvider } from "@render-core/contexts/ParentDataContext";

const GlobalContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const globalStore = useGlobalStore();
  return <ParentDataProvider>{children}</ParentDataProvider>;
};

type DataSources = {
  father?: Record<string, any>;
  global: Record<string, any>;
};

const a = 1;

const parseExpression = (expr: string, context: DataSources) => {
  const pattern = /\$(father|global)\.([\w.]+)/g;
  return expr.replace(pattern, (_, type, path) => {
    const dataSource = type === "father" ? context.father : context.global;
    // path a.b
    return path.split(".").reduce((acc, key) => acc?.[key], dataSource);
  });
};

// 动态属性解析器
const resolveDynamicProps = (props: Record<string, any>) => {
  const globalStore = useGlobalStore.getState()?.state;
  if (!props || !globalStore) {
    return;
  }
  const obj = Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (typeof value === "string" && value.includes("$")) {
        acc[key] = parseExpression(value, {
          global: globalStore,
        });
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

const RenderPage = (props) => {
  const { componentsMap } = props;
  const componentRefs = useRef<Record<string, any>>({});
  const [components, setComponents] = useImmer<any>(props.components);
  console.log(components);

  const { setGlobalData } = useGlobalStore();

  useEffect(() => {
    setGlobalData(components[0]._runTimeContext?.globalState);
  }, []);

  const handleEvents = (component: Component) => {
    const props: Record<string, any> = {}; // 收集与事件相关的props，最终传递给createElement方法中的props: { 'onClick': f() }

    componentsMap[component.type].events?.forEach((event) => {
      const actions = component.userCustomConfigEvents?.[event.name]?.actions;
      if (actions?.length > 0) {
        props[event.name] = (...args) => {
          // 事件队列依次处理
          actions.forEach((action) => {
            const { type, url, code, componentId, method } = action;
            if (type === "goToLink" && url) {
              window.open(url, "_blank");
            } else if (type === "customJs") {
              // window.eval(code)
              // 为执行上下文，绑定了2个参数
              // args[0] 为当前函数的返回值
              // component 为当前组件实例
              // flushRuntime 为刷新运行时上下文
              const func = new Function(code).bind({
                args: args,
                component,
                flushRuntime: (_runTimeContext) =>
                  setComponents((draft) => {
                    let temp = getElementById(draft, component.id);
                    console.log(
                      "_runTimeContext",
                      _runTimeContext,
                      component.id,
                    );
                    temp._runTimeContext = _runTimeContext;
                  }),
              });
              func();
            } else if (type === "componentMethod") {
              const component = componentRefs.current[componentId];

              if (component) {
                component[method]?.();
              }
            }
          });
        };
      }
    });

    return props;
  };

  const renderComponent = (components: Component[]): ReactNode | undefined => {
    if (!components || components?.length <= 0) {
      return;
    }

    return components.map((component) => {
      const configComponent = componentsMap[component.type];
      console.log("组件渲染", configComponent, component);

      const resolvedProps = resolveDynamicProps(
        component.userCustomConfigProps,
      );

      console.log("动态解析后的props", resolvedProps);

      return createElement(
        configComponent.component,
        {
          key: component.id,
          ref:
            configComponent.component?.$$typeof ===
            Symbol.for("react.forward_ref")
              ? (ref: Record<string, any>) => {
                  componentRefs.current[component.id] = ref;
                }
              : undefined,
          styles: component.userCustomConfigStyles,
          name: configComponent.name,
          _runTimeContext: component._runTimeContext, // 组件运行时上下文
          ...configComponent.defaultProps,
          ...component.userCustomConfigProps,
          ...resolvedProps,
          ...handleEvents(component),
        },
        renderComponent(component.children),
      );
    });
  };

  return (
    <GlobalContextWrapper>{renderComponent(components)}</GlobalContextWrapper>
  );
};

export default RenderPage;
