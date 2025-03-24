import { Card as AntdCard } from "antd"
import { PropsWithChildren } from "react"
import { ComponentsBase } from '@lowcode/types/component'
import config from './config'
import { Select } from 'antd'
import { useResolveProps } from '@lowcode/hooks/useResolveProps'


const resolveRuntimeContext = (_runTimeContext: any) => {
    let options = []
    if (_runTimeContext) {
        options = _runTimeContext?.options
    }
    return { options }
}

const RunTimeSearch = (props: { id: number, width: number, options: { value: string, label: string }[] } & ComponentsBase) => {
    const { styles, width, options, _runTimeContext, resetProps } = useResolveProps(props)
    const { options: _options } = resolveRuntimeContext(_runTimeContext)
    return (
        <Select options={_options || options} style={{ width, ...styles }} showSearch {...resetProps}></Select>
    )
}

export const Search = {
    ...config,
    component: RunTimeSearch
}

export default RunTimeSearch