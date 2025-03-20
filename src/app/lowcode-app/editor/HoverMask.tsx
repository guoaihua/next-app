
// 当前hover元素的底部遮罩，使用容器和当期那选中元素计算相对位置，定位到当前元素的底部
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useComponentsStore } from '@/app/lowcode-app/store/components'

interface HoverMaskProps {
    containerClassName: string
    curContainerId: number
    wrapperClassName: string
}

export const HoverMask = (props: HoverMaskProps) => {
    const { containerClassName, wrapperClassName, curContainerId } = props
    const { findComponentById } = useComponentsStore()
    const [position, setPosition] = useState<{
        top: number; left: number, width: number, height: number, labelTop: number, labelLeft: number
    }>({ top: 0, left: 0, height: 0, width: 0, labelLeft: 0, labelTop: 0 })

    const currentComponentIdRef = useRef<number>(undefined)


    useEffect(() => {
        currentComponentIdRef.current = curContainerId

        updatePosition()
    }, [curContainerId])

    useEffect(() => {

        const resizeObserver = new ResizeObserver(() => {
            updatePosition()
        })

        const ele = document.getElementsByClassName(containerClassName)?.[0]

        resizeObserver.observe(ele)

        return () => {
            resizeObserver.unobserve(ele)
        }
    }, [])

    const updatePosition = () => {
        const container = document.getElementsByClassName(containerClassName)?.[0]
        const currentComponentEle = document.querySelector(`[data-component-id="${curContainerId}"]`)
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

    const hoverComponent = useMemo(() => findComponentById(curContainerId), [curContainerId])

    return createPortal(
        <>
            <div style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
                height: position.height,
                backgroundColor: "rgba(0, 0, 255, 0.05)",
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
                    {hoverComponent?.name}
                </div> 
            </div>
        </>
        , document.getElementsByClassName(wrapperClassName)?.[0])
}