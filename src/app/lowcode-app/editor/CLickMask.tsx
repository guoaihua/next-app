
"use client"

import { Component } from '@/app/lowcode-app/types/component'
import { Popconfirm, Space,Dropdown} from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DeleteOutlined } from '@ant-design/icons';
import { useComponentsStore } from '@/app/lowcode-app/store/components'

interface ClickMaskProps {
    containerClassName: string
    curContainerId: number
    wrapperClassName: string
    currentComponent: Component
}

export const ClickMask = (props: ClickMaskProps)=> {
    const { containerClassName, curContainerId, wrapperClassName, currentComponent }  = props
    
    const { deleteComponent, setCurrentComponent, findFatherComponents, components} = useComponentsStore()
    const currentComponentIdRef = useRef<number>(undefined)

    const fatherComponents = useMemo(() => findFatherComponents(currentComponent), [currentComponent])

    const [position, setPosition] = useState<{
        top: number; left: number, width: number, height: number, labelTop: number, labelLeft: number
    }>({ top: 0, left: 0, height: 0, width: 0, labelLeft: 0, labelTop: 0 })

    useEffect(() => {
        currentComponentIdRef.current = curContainerId
        updatePosition()
    }, [curContainerId])

    useEffect(()=>{
        setTimeout(()=> {
            updatePosition()
        },500) // 属性变了，这里要晚点计算
    }, [components]) // 属性变了，也要出发变更

    useEffect(()=>{

        const resizeObserver = new ResizeObserver(()=> {
            updatePosition()
        })

        const ele = document.getElementsByClassName(containerClassName)?.[0]

        resizeObserver.observe(ele)

        return ()=>{
            resizeObserver.unobserve(ele)
        }
    },[])

    const updatePosition = ()=> {
        
        const container = document.getElementsByClassName(containerClassName)?.[0]
        const currentComponentEle = document.querySelector(`[data-component-id="${currentComponentIdRef.current}"]`)
        if (!container || !currentComponentEle) return
        const { top: containerTop, left: containerLeft } = container.getBoundingClientRect()
        const { top, left, width, height } = currentComponentEle.getBoundingClientRect()

        let labelTop = top - containerTop + container.scrollTop;
        const labelLeft = left - containerLeft + width;

        if (labelTop <= 20) {
            labelTop += 20
        }

        setPosition({
            top: top - containerTop + container.scrollTop,
            left: left - containerLeft + container.scrollLeft, // 滚动补偿，当前高度是针对于视口的，需要加上滚动高度，实际高度是针对于容器的,
            width: width,
            height: height,
            labelTop: labelTop,
            labelLeft: labelLeft
        })
    }

    const handleDelete = ()=> {
        deleteComponent(curContainerId)
        setCurrentComponent()
    }

    return createPortal(
        <>
            <div style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
                height: position.height,
                backgroundColor: "#e4359f0d",
                pointerEvents: 'none', // 防止遮罩层被点击
                zIndex: -1,
                boxSizing: 'border-box',
            }} />

            <div style={{
                zIndex: 1,
                position: 'absolute',
                top: position.labelTop,
                left: position.labelLeft,
                display: (!position.width || position.width < 10) ? "none" : "inline",
                transform: 'translate(-100%, -100%)', // 向左移动宽度的100%，向上移动高度的100%
            }}>
                <Space>
                    {
                        findFatherComponents?.length>0 ? (
                            <Dropdown menu={{
                                items: fatherComponents?.map(({ id, name }) => ({ label: name, key: id })),
                                onClick: ({key})=> {
                                    setCurrentComponent(+key)
                                }
                            }}>
                                <div
                                    style={{
                                        padding: '0 8px',
                                        backgroundColor: 'blue',
                                        borderRadius: 4,
                                        color: '#fff',
                                        cursor: "pointer",
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {currentComponent?.name}
                                </div>
                            </Dropdown>
                        ): null
                    }

                    {currentComponent?.type !== 'page' && (
                        <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
                            <Popconfirm
                                title="确认删除？"
                                okText={'确认'}
                                cancelText={'取消'}
                                onConfirm={handleDelete}
                            >
                                <DeleteOutlined style={{ color: '#fff' }} />
                            </Popconfirm>
                        </div>
                    )}
                </Space>
            </div>
        </>
        , document.getElementsByClassName(wrapperClassName)?.[0])
}