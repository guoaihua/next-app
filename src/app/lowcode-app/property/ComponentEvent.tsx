
import { useComponentsStore } from '@/app/lowcode-app/store/components'
import { useComponentsConfigStore } from '@/app/lowcode-app/store/components-configs';
import { Button, Collapse, Dropdown, Card, Space } from "antd";
import { useMemo, useState } from 'react';
import { DeleteOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { ActionModal } from './actions/ActionModal';
import pickBy from "lodash-es/pickBy";


const panelStyle: React.CSSProperties = {
    borderRadius: 2,
    border: 'none',
    background: 'white'
};

export const ComponentEvent = () => {
    const { components, currentComponentId, currentComponent, updateComponentEvents } = useComponentsStore()
    const { componentsMap } = useComponentsConfigStore()
    const [showActionModal, setShowActionModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState('')
    const [curEditAction, setCurEditAction] = useState<{
        action: any
        actionIndex: number
        eventKey: string
    }>()


    // [当前配置中的事件， 实际生效事件]
    const [currentConfigEvents = [], currentActiveEvents = {}] = useMemo(() => {
        if (!currentComponent) { return [] }
        return [componentsMap[currentComponent?.type]?.events, pickBy(currentComponent?.userCustomConfigEvents, value => value)]
    }, [currentComponent, components])






    const handleSelectEvent = (eventName) => {
        // 选择事件时， 先占位，添加 { 'onClick': {}} 结构
        updateComponentEvents(currentComponentId, { [eventName]: {} })
    }

    function handleOk(config) {
        if (!currentComponentId) return;

        // curEditAction 存在说明是在做更新
        if(curEditAction){
            const actions = [...(currentComponent?.userCustomConfigEvents?.[curEditAction.eventKey]?.actions ?? [])]
            actions.splice(curEditAction.actionIndex, 1, config)
            updateComponentEvents(currentComponentId, {
                [curEditAction.eventKey]: {
                    actions: [
                        ...actions
                    ]
                }
            }) 
        }else {
            updateComponentEvents(currentComponentId, {
                [selectedEvent]: {
                    actions: [
                        ...(currentComponent?.userCustomConfigEvents?.[selectedEvent]?.actions ?? []), // 增加 好像没有替换？
                        config
                    ]
                }
            })
        }
        setCurEditAction(undefined)
        setShowActionModal(false)
    }

    const deleteAction = (index: number, eventKey) => {
        const newActions = [...currentComponent?.userCustomConfigEvents?.[eventKey]?.actions ?? []] // 复制actions
        newActions?.splice(index, 1)
        updateComponentEvents(currentComponentId, {
            [eventKey]: {
                actions: newActions
            }
        })
    }

    const deleteEvent = (e, eventKey) => {
        e.stopPropagation();
        updateComponentEvents(currentComponentId, {
            [eventKey]: undefined
        })
    }


    return (
        <>
            {/* <Collapse className='mb-[10px]' items={currentConfigEvents?.map(v=> {
            return ({
                key:v.name,
                label: v.label,
                children: (
                <>
                        <div className='flex items-center'>
                            <div>动作：</div>
                            <Select
                                className='w-[160px]'
                                options={[
                                    { label: '显示提示', value: 'showMessage' },
                                    { label: '跳转链接', value: 'goToLink' },
                                ]}
                                onChange={value=> {
                                    set
                                    setShowActionModal(true)
                                }}
                                value={currentActiveEvents?.[v.name]?.type} // 回填
                            />
                            {
                                currentActiveEvents?.[v.name]?.type  === 'goToLink' && (
                                    <>
                                        {
                                                <div className='mt-[10px]'>
                                                    <div className='flex items-center gap-[10px]'>
                                                        <div>链接</div>
                                                        <div>
                                                            <Input
                                                                onChange={(e) => { urlChange(v.name, e.target.value) }}
                                                            value={currentActiveEvents?.[v.name]?.url}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    
                                    </>
                                )
                            }
                        </div>
                </>)
            })
        })} 
        /> */}
        <div className='flex flex-col gap-3.5'>
                <Dropdown menu={{
                    items: currentConfigEvents?.map(event => ({ label: event.label, key: event.name, disabled: Object.keys(currentActiveEvents)?.includes(event?.name) })),
                    onClick: ({ key }) => {
                        handleSelectEvent(key)
                    }
                }} trigger={['click']}>
                    <Button className='w-[80%] m-auto'> 添加事件 </Button>
                </Dropdown>

                {
                    Object.keys(currentActiveEvents)?.length > 0 ? (
                        <Collapse bordered={false} size='small' 
                            defaultActiveKey={Object.keys(currentActiveEvents)}
                        items={Object.keys(currentActiveEvents)?.map(eventKey => {
                            // 根据当前添加
                            const event = currentConfigEvents?.find(v => v.name === eventKey)
                            if (!event) { return {} }

                            return ({
                                key: eventKey,
                                label: (
                                    <div className='flex justify-between'>
                                        <span>{event.label}</span>
                                        <Space>
                                            <PlusOutlined onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedEvent(eventKey)
                                                setShowActionModal(true)
                                            }} />
                                            <DeleteOutlined onClick={(e) => deleteEvent(e, eventKey)} />
                                        </Space>

                                    </div>
                                ),
                                style: panelStyle,
                                children: currentActiveEvents?.[eventKey]?.actions?.map((action, index) => {
                                    return (
                                        <>
                                            <Card title={action.type} extra={
                                                <Space>
                                                    <DeleteOutlined onClick={() => {
                                                        deleteAction(index, eventKey)
                                                    }} />

                                                    <SettingOutlined onClick={(e)=>{
                                                        e.stopPropagation();
                                                        setCurEditAction({
                                                            eventKey,
                                                            actionIndex: index,
                                                            action: currentActiveEvents[eventKey]?.actions?.[index]
                                                        })
                                                        setShowActionModal(true)
                                                    }}/>
                                                </Space>
           
                                            } style={{ marginBottom: 8 }}>
                                                {action.desc}
                                            </Card>
                                        </>
                                    )
                                })
                            })
                        })} />
                    ) : null
                }
                {
                    showActionModal && <ActionModal onClose={() => {setShowActionModal(false); setCurEditAction(undefined);}} action={curEditAction?.action} activeEventName={selectedEvent} handleOk={handleOk} />
                }

        </div>

        </>
    )
}