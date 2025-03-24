/** 提取所有组件都会使用的属性，其余特性属性放在resetProps中，以供组件自行提取 */
export const useResolveProps = (props: any) => {
    const {
        styles, width, options, _runTimeContext,
        ...resetProps
    } = props ?? {}

    return {
        styles,
        width,
        options,
        _runTimeContext,
        resetProps
    }
}