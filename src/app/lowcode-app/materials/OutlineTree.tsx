import React, { useMemo } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { useComponentsStore } from '@/app/lowcode-app/store/components'


export const OutlineTree = () => {
    const { components, setCurrentComponent} = useComponentsStore()

    const onSelect = (selectedKeys: number[]) => {
        setCurrentComponent(selectedKeys[0])
    };

    const treeData = useMemo(() => {
        const formData = (nodes: any) => {
            if (!nodes || nodes.length <= 0) {
                return []
            }
            // 遍历自身以及子集
            return nodes.map(v => {
                return ({
                    title: v.name,
                    key: v.id,
                    children: formData(v.children)
                })
            })
        }

        const newTree = formData(components)
        return newTree
    }, [components])

    return (
        <>
            <h3 className=' mb-2.5'>组件大纲</h3>
            <Tree
                key='id'
                showLine
                switcherIcon={<DownOutlined />}
                onSelect={onSelect}
                treeData={treeData}
                defaultExpandAll
            />
        </>


    )
}