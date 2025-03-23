import { Card as AntdCard } from "antd"
import { PropsWithChildren } from "react"
import { ComponentsBase } from '@lowcode/types/component'
import config from './config'

const RunTimeCard = (props: PropsWithChildren<{} & ComponentsBase>) => {
    const { children, id, styles, ...restProps } = props
    return (
        <AntdCard
            data-component-id={id}
            style={styles}
            {...restProps}
        >
            {children}
        </AntdCard>
    )

}


export const Card = {
    ...config,
    component: RunTimeCard,
}

export default RunTimeCard;
