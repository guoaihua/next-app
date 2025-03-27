import { Button, Input, Popconfirm, Form, Collapse } from "antd";
import { useComponentsStore } from "@lowcode/store/components"
import { loader } from '@monaco-editor/react'
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { CollapseProps } from 'antd';
import { createSafeFunction } from "@lowcode/libs/tools"
import { useMemo } from "react";
import { Typography } from 'antd';
import dynamic from 'next/dynamic';


// 动态加载编辑器（禁用 SSR）
const Editor = dynamic(
    () => import('@monaco-editor/react').then(mod => mod.default),
    { ssr: false }
);
// 配置本地路径
loader.config({
    paths: {
        vs: `/monaco-editor/vs`, // 对应 public/monaco-editor/vs
    },
});

const { Paragraph, Text } = Typography;

const panelStyle: React.CSSProperties = {
    border: 'none',
};

const DataSource = () => {
    // 展示弹窗
    const [form] = Form.useForm();

    const { getGloableStateFromTopComponent, insertGloableStateToTopComponent, components } = useComponentsStore()

    const globalState = useMemo(() => getGloableStateFromTopComponent(), [components])

    const handleOk = () => {
        const { name, value } = form.getFieldsValue()
        insertGloableStateToTopComponent({ [name]: createSafeFunction(value) })
        // 重置状态
        form.resetFields()
    }

    const CodeEditor = (props) => {
        const { value, onChange } = props
        return (
            <div className="border border-gray-300 p-1.5">
                <Editor
                    value={value}
                    onChange={onChange}
                    height='200px'
                    width={'100%'}
                    defaultLanguage='json'
                    options={
                        {
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            minimap: {
                                enabled: false,
                            },
                            scrollbar: {
                                verticalScrollbarSize: 6,
                                horizontalScrollbarSize: 6,
                            },
                            lineNumbers: 'off'
                        }
                    }
                />
            </div>
        )
    }

    const CodeEditorWrapper = (
        <Form form={form} style={{ width: 500 }}>
            <Form.Item
                name="name"
                label="变量名"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="value"
                label="初始值"
                shouldUpdate
            >
                <CodeEditor />
            </Form.Item>
        </Form>
    )

    const collapseItems: CollapseProps['items'] = [
        {
            key: 'globalState',
            label: (
                <div className="flex justify-between">
                    <span>全局变量</span>
                    <Popconfirm
                        title={<span className="text-[18px] font-medium">创建全局变量</span>}
                        description={CodeEditorWrapper}
                        onConfirm={handleOk}
                        onPopupClick={(e) => {
                            e.stopPropagation()
                        }}
                        icon={null}
                        okText="创建变量"
                        cancelText="取消"
                    >
                        <PlusOutlined onClick={(e) => {
                            e.stopPropagation()
                            e.nativeEvent.stopImmediatePropagation()
                        }} />
                    </Popconfirm>
                </div>
            ),
            children: (
                <div>
                    {Object.keys(globalState ?? {}).map((key, index) => (
                        <p key={index} className="flex gap-1 group items-center">
                            <span>{key}:</span>
                            <Paragraph style={{ marginBottom: 0 }} ellipsis>{JSON.stringify(globalState[key])}</Paragraph>
                            <Popconfirm
                                title={<span className=" text-xl font-bold">编辑全局变量</span>}
                                description={CodeEditorWrapper}
                                onConfirm={handleOk}
                                onCancel={() => form.resetFields()}

                                onPopupClick={(e) => {
                                    e.stopPropagation()
                                }}
                                icon={null}
                                okText="修改变量"
                                cancelText="取消"
                            >
                                <EditOutlined className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => {
                                    e.stopPropagation()
                                    e.nativeEvent.stopImmediatePropagation()
                                    form.setFieldsValue({ name: key, value: JSON.stringify(globalState[key], null, 2) })
                                }} />
                            </Popconfirm>

                        </p>
                    ))}
                </div>
            ),
            style: panelStyle
        }
    ]

    return (
        <>
            <Collapse style={{ borderRadius: 0 }} items={collapseItems} />
        </>
    )
}

export default DataSource;