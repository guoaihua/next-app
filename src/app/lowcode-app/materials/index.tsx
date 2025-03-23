"use client"

import { useComponentsStore } from '@/app/lowcode-app/store/components'
import { useComponentsConfigStore } from "@/app/lowcode-app/store/components-configs";
import { Fragment, useMemo, useState } from "react";
import MaterialItem from "./materialItem";
import { Segmented } from "antd";
import {
  AppstoreOutlined,
  PartitionOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { OutlineTree } from "./OutlineTree";
import { SourceCode } from "./SourceCode";


enum MaterialsEnum {
  COMPONENT,
  OUTLINE,
  SOURCE_CODE,
}

const MATERIALS_OPTION = [
  {
    label: <AppstoreOutlined />,
    value: MaterialsEnum.COMPONENT,
  },
  {
    label: <PartitionOutlined />,
    value: MaterialsEnum.OUTLINE,
  },
  {
    label: <CodeOutlined />,
    value: MaterialsEnum.SOURCE_CODE,
  },
];

const Materials = () => {
  const [materialOpt, setMaterialOpt] = useState(MaterialsEnum.COMPONENT);
  const { componentsMap } = useComponentsConfigStore();
  const materials = useMemo(() => {
    return Object.keys(componentsMap)?.filter((v) => v !== "page");
  }, [componentsMap]);


  return (
    <div className="flex h-full gap-1">
      <div className="h-full border-r border-r-blue-200 w-[43px]">
        <Segmented
          size="large"
          vertical
          value={materialOpt}
          onChange={setMaterialOpt}
          options={MATERIALS_OPTION}
        />
      </div>
      <div className="h-full w-[calc(100%-43px)]">
        {materialOpt === MaterialsEnum.COMPONENT && (
          <>
            <h3 className=" mb-2.5">组件</h3>
            <div className="flex flex-wrap gap-1">
              {materials?.map((key, index) => {
                const component = componentsMap[key];
                return <Fragment key={index}><MaterialItem component={component} /></Fragment> ;
              })}
            </div>
          </>
        )}
        {materialOpt === MaterialsEnum.OUTLINE && <OutlineTree />}
        {materialOpt === MaterialsEnum.SOURCE_CODE && <SourceCode />}
      </div>
    </div>
  );
};

export default Materials;