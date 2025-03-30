import { createContext, useCallback, useContext, useState } from "react";
import { useGlobalStore } from "../stores/globalStore";

const RuntimeContext = createContext({
  global: {},
  resolvePath: (path: string) => null,
});

export const RuntimeProvider = ({ children }) => {
  const global = useGlobalStore();
  const componentTree = {}; // 维护组件树结构

  const resolvePath = useCallback(
    (path: string) => {
      const [scope, ...segments] = path.split(".");

      if (scope === "global") {
        return segments.reduce((acc, key) => acc?.[key], global);
      }

      if (scope === "father") {
        // const currentComponent = componentTree.current;
        // return componentTree.getFatherData(currentComponent.id, segments);
      }

      return undefined;
    },
    [global, componentTree],
  );

  return (
    <RuntimeContext.Provider value={{ global, resolvePath }}>
      {children}
    </RuntimeContext.Provider>
  );
};

export const useParentData = () => useContext(RuntimeContext);
