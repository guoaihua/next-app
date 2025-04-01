"use client";
import React, { useMemo, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { useComponentsStore } from "@/app/lowcode-app/store/components";

const findNode = (tree: any, key: number) => {
  if (!tree || !key) return;

  for (const item of tree) {
    if (item.id === key) {
      return item;
    }
    const res = findNode(item.children, key);
    if (res) return res;
  }
};

const findNodeParent = (tree: any, key: number) => {
  if (!tree || !key) return;

  for (const item of tree) {
    if (item.children) {
      //当前层直接遍历子集，以便直接返回的是父级
      const foundChild = item.children.find((child: any) => child.id === key);
      if (foundChild) {
        return item;
      }
      const parent = findNodeParent(item.children, key);
      if (parent) return parent;
    }
  }
  return undefined;
};

export const OutlineTree = () => {
  const { components, setCurrentComponent } = useComponentsStore();
  const [data, setData] = useState(components);

  const onSelect = (selectedKeys: number[]) => {
    setCurrentComponent(selectedKeys[0]);
  };

  const treeData = useMemo(() => {
    const formData = (nodes: any) => {
      if (!nodes || nodes.length <= 0) {
        return [];
      }
      // 遍历自身以及子集
      return nodes.map((v) => {
        return {
          title: v.name + v.id,
          key: v.id,
          children: formData(v.children),
        };
      });
    };

    const newTree = formData(data);
    return newTree;
  }, [data]);

  const onDrop = (info: any) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const treeData = [...data];

    // 找到拖拽的节点
    const dragObj = findNode(treeData, dragKey);
    const dropObj = findNode(data, dropKey);
    if (!dragObj || !dropObj) return;

    // 移除拖拽节点
    const dragParent = findNodeParent(data, dragKey);
    console.log(dragParent);
    dragParent?.children?.splice(
      [...dragParent.children]?.map((v) => v)?.indexOf(dragObj.node),
      1,
    );

    // 找到拖拽的节点的父节点
    const dropParent = findNodeParent(data, dropKey);

    let targetArray = dropParent ? dropParent.children : treeData;
    let targetIndex =
      [...targetArray]?.map((v) => v.id)?.indexOf(dropObj.id) || 0;

    if (dropPosition === -1) {
      // 插入到目标节点前面
      targetArray?.splice(targetIndex, 0, dragObj);
    } else {
      // 插入到目标节点后面
      targetArray?.splice(targetIndex + 1, 0, dragObj);
    }

    setData([...data]);
  };

  return (
    <>
      <h3 className=" mb-2.5">组件大纲</h3>
      <Tree
        key="id"
        showLine
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        treeData={treeData}
        defaultExpandAll
        draggable
        onDrop={onDrop}
      />
    </>
  );
};
