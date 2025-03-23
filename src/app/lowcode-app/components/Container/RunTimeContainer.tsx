import { CSSProperties, PropsWithChildren } from "react"
import './index.scss'
import config from './config'
import { Flex } from "antd"
import classNames from "classnames"

const RuntimeContainer = (props: PropsWithChildren<{ id: number, styles: CSSProperties, isFlex: boolean }>) => {
    const { id, styles, isFlex } = props
    return <div data-component-id={id} style={styles} className={classNames("Container  h-50 w-2xs ", isFlex ? { flex: true, "items-center": true, "justify-center": true } : null)}>{props?.children}</div>
}

export const Container = {
    ...config,
    component: RuntimeContainer
}

export default RuntimeContainer;
