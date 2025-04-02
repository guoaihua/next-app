import { useDrag } from "react-dnd";
import classNames from "classnames";
import { AlignCenterOutlined } from "@ant-design/icons";
const MaterialItem = (props: { component: any }) => {
  const { component } = props;
  console.log(component);
  // 为每个组件添加拖拽事件
  const [{ isDragging }, drag] = useDrag(() => ({
    type: component?.type,
    item: {
      type: component?.type,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={classNames(
        "border-solid border border-indigo-200 px-2 py-1 rounded-sm cursor-pointer",
        { "bg-amber-200": isDragging },
      )}
      ref={drag as any}
    >
      <AlignCenterOutlined className="mr-1.5" />
      {component?.name}
    </div>
  );
};

export default MaterialItem;
