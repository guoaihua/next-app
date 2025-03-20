import { useDrag } from 'react-dnd'
import classNames from "classnames";
const MaterialItem = (props: {component: any}) => {
    const {component} = props

    // 为每个组件添加拖拽事件
    const [{ isDragging }, drag] = useDrag(() => ({
        type: component?.type,
        item: {
            type: component?.type,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))
    
    return (
        <div className={classNames('border-solid border border-indigo-200 px-2 py-1 rounded-sm', { 'bg-amber-200': isDragging})} ref={drag as any}>
            {component?.name}
        </div>
    )
}

export default MaterialItem;