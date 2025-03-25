import { Button, Input, Popconfirm, Form } from "antd";
import { useComponentsStore } from "@lowcode/store/components"
import Editor from '@monaco-editor/react'

const { TextArea } = Input;
const DataSource = () => {
    // 展示弹窗
    const [form] = Form.useForm();

    const { getGloableStateFromTopComponent, insertGloableStateToTopComponent } = useComponentsStore()

    const handleAddData = () => {
        const { name, value } = form.getFieldsValue()
        const createSafeFunction = (code) => {
            try {
                return new Function('return ' + code)();
            } catch (e) {
                console.error('代码解析错误:', e);
                return null;
            }
        };

        console.log(name, createSafeFunction(value))
        insertGloableStateToTopComponent({ [name]: createSafeFunction(value) })
    }
    return (
        <>
            <Popconfirm
                title="Title"
                description={(
                    <Form form={form}>
                        <Form.Item
                            name="name"
                            label="变量名"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="value"
                            label="变量值"
                        >
                            <Editor
                                height='100px'
                                width={'95%'}
                                defaultLanguage='javascript'
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
                        </Form.Item>
                    </Form>
                )}
                onConfirm={handleAddData}
            >
                <Button type="default">Open Popconfirm with Promise</Button>
            </Popconfirm>
            <br />
            已经注入的全局变量：{JSON.stringify(getGloableStateFromTopComponent())}
        </>
    )
}

export default DataSource;