
import { CSSProperties, PropsWithChildren } from "react"
import config from './config'


const RunTimePage = (props: PropsWithChildren<{ id: number, styles: CSSProperties }>) => {
    const { id, styles, ...resetProps } = props

    return (
        <div {...resetProps} style={styles} data-component-id={id} className="page w-full h-full" >{props?.children}</div>
    )
}

export const Page = {
    ...config,
    component: RunTimePage,
}


export default RunTimePage
