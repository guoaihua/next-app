import { Modal, Tree } from "antd"
import { useState } from "react"
import { GoToLink } from "./GotoLink"
import { CustomJs } from './CustomJs'
import { ComponentMethod } from './ComponentMethod'

interface ActionModalProps {
    onClose: () => void
    activeEventName: string
    handleOk: (config: any) => void
    action?: any
}


export const ActionModal = (props: ActionModalProps) => {
    const { onClose, activeEventName, handleOk, action={} } = props
    console.log('action: ', action);
    const [selectedAction, setSelectedAction] = useState(action?.type)
    const [config, setConfig] = useState({})
    const actionsList = [
        {
            label: '跳转链接',
            type: 'goToLink',
            children: []
        },
        {
            label: '自定义js',
            type: 'customJs',
        },
        {
            label: '组件方法',
            type: 'componentMethod'
        }
    ]
    console.log('activeEventName: ', activeEventName);

    return (
        <Modal
            open
            width={'65vw'}
            onCancel={onClose} onClose={onClose}
            title="动作配置"
            okText="确定"
            cancelText="取消"
            onOk={() => handleOk(config)}
        >
            <div className="flex min-h-[400px] border border-amber-100">
                <div className="w-[200px] border-r border-r-blue-300">
                    <Tree
                        fieldNames={{ title: 'label', key: 'type' }}
                        defaultExpandAll
                        onSelect={(selectedKeys: any) => {
                            console.log('selectedKeys: ', selectedKeys);
                            setSelectedAction(selectedKeys[0])
                        }}
                        treeData={actionsList as any} />
                </div>
                <div className="p-2 w-[calc(100%-200px)]">
                    <h3>动作配置</h3>
                    {
                        selectedAction === 'goToLink' && (<GoToLink defaultValue={action.url} onChange={(config) => {
                            setConfig(config)
                        }} />)
                    }
                    {
                        selectedAction === 'customJs' && (<CustomJs defaultValue={action.code}  onChange={(config) => {
                            setConfig(config)
                        }} />)
                    }
                    {
                        selectedAction === 'componentMethod' && <ComponentMethod key="showMessage" value={action?.type === 'componentMethod' ? { componentId: action.componentId, method: action.method } : undefined} onChange={(config) => {
                            setConfig(config);
                        }} />
                    }
                </div>
            </div>

        </Modal>
    )
}