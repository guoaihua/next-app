
import { useDrop } from 'react-dnd'
import { useComponentsStore } from '@/app/lowcode-app/store/components'
import { useComponentsConfigStore } from '@/app/lowcode-app/store/components-configs'

export const useApplyDrop = (props: {accept: string[], id: number})=> {
    const {accept, id} = props ?? {}
    const { componentsMap } = useComponentsConfigStore()
    const { addComponent } = useComponentsStore()
    // 支持放置组件
    const [collect, drop] = useDrop(
      () => ({
        accept,
        drop: (item: { type: string }, monitor) => {
          console.log("item, monitor: ", item.type, monitor.didDrop());

          // 已经放置过了，不要重复处理
          if (monitor.didDrop()) {
            return;
          }
          console.log("item, monitor: ", item, monitor);
          // 添加组件到store中， 获取组件的配置信息
          const component = componentsMap[item.type];
          addComponent(component, id);
        },
      }),
      [id]
    );

    return {
        ref: drop as any,
        collect
    }
}