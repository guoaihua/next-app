"use client";
import "./App.css";
import "allotment/dist/style.css";

import { Allotment } from "allotment";

import Materials from "@/app/lowcode-app/materials/index";
import Editor from "@/app/lowcode-app/editor/index";
import Property from "@/app/lowcode-app/property/index";
import { Header } from "@/app/lowcode-app/editor/Header";
import { useComponentsStore } from "@/app/lowcode-app/store/components";
import { useComponentsConfigStore } from "@/app/lowcode-app/store/components-configs";
import { Button, Drawer } from "antd";
import RenderPage from "../../render-core";
import { useEffect, useState } from "react";
import { autoSave, fetchData, changeVersion } from "@lowcode/store/auto-save";

function App() {
  const { mode, components } = useComponentsStore();
  const { componentsMap } = useComponentsConfigStore();
  const [versionData, setVersionData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    console.log(" use effect");
    autoSave();
    const versionData = fetchData();
    setVersionData(versionData);
  }, []);

  return (
    <>
      <div className="h-[60px] sticky top-[0px] flex items-center border-b-[1px] border-[#e8e9eb]">
        <Header setShowDrawer={setShowDrawer} />
      </div>
      <div className="h-[calc(100%-60px)]">
        {mode === "edit" ? (
          <Allotment>
            <Allotment.Pane minSize={250} preferredSize={346}>
              <Materials />
            </Allotment.Pane>
            <Allotment.Pane minSize={200}>
              <Editor />
            </Allotment.Pane>
            <Allotment.Pane minSize={300} maxSize={500}>
              <Property />
            </Allotment.Pane>
          </Allotment>
        ) : (
          <RenderPage components={components} componentsMap={componentsMap} />
        )}
        <Drawer
          title="历史版本"
          onClose={() => setShowDrawer(false)}
          open={showDrawer}
        >
          {versionData?.map((item) => {
            return (
              <p
                key={item.version}
                onClick={() => {
                  setShowDrawer(false);
                }}
              >
                版本：{item.version} 最后保存时间：{item.timeStamp}
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation;
                    changeVersion(item.data);
                  }}
                >
                  使用此版本
                </Button>
              </p>
            );
          })}
        </Drawer>
      </div>
    </>
  );
}

export default App;
