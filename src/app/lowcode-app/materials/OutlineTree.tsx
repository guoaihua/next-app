"use client";
import React, { useMemo, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { useComponentsStore } from "@/app/lowcode-app/store/components";
import type { TreeDataNode } from "antd";

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
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const treeData = data;

    // 找到拖拽的节点
    const loop = (
      data: any[],
      key: React.Key,
      callback: (node: any, i: number, data: any[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    let dragObj;
    loop(treeData, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(treeData, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      let parentId;
      loop(treeData, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
        parentId = _item.parentId;
      });

      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i!, 0, dragObj!);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i! + 1, 0, dragObj!);
      }
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
        draggable={{ icon: false }}
        onDrop={onDrop}
      />
    </>
  );
};
