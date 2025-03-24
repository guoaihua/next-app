"use client"

import { useState } from "react";
import { Segmented } from "antd";
import {
  AppstoreOutlined,
  PartitionOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { OutlineTree } from "./OutlineTree";
import { SourceCode } from "./SourceCode";
import { ComponentList } from "./ComponentList";


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
        {materialOpt === MaterialsEnum.COMPONENT && <ComponentList />}
        {materialOpt === MaterialsEnum.OUTLINE && <OutlineTree />}
        {materialOpt === MaterialsEnum.SOURCE_CODE && <SourceCode />}
      </div>
    </div>
  );
};

export default Materials;