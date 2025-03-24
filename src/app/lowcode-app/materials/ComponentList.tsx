import { useComponentsConfigStore } from "@/app/lowcode-app/store/components-configs";
import { Fragment, useMemo } from "react";
import MaterialItem from "./materialItem";
import { groupBy } from 'lodash-es'
import { classifyMap } from "@lowcode/const/index"
import { Col, Collapse, Divider, Row } from "antd";


export const ComponentList = () => {
    const { componentsMap } = useComponentsConfigStore();
    const materialGroup = useMemo(() => {
        const componentList = Object.keys(componentsMap)?.filter((v) => v !== "page")?.map(v => ({ type: v, classify: componentsMap[v].classify }));
        const group = groupBy(componentList, (v) => v.classify);
        return group
    }, [componentsMap]);

    const panelStyle: React.CSSProperties = {
        border: 'none',
    };

    return (
        <>
            <h3 className=" mb-2.5">组件</h3>
            {/* 现在比较少，可以直接展示所有组件，后续可以做分类展示 */}
            <Collapse defaultActiveKey={Object.keys(materialGroup)} items={Object.keys(materialGroup).map((v, index) => {
                return {
                    key: v,
                    label: classifyMap[v],
                    children: (
                        <div className="flex flex-wrap gap-1">
                            <Row gutter={[16, 16]} className="w-full">
                                {
                                    materialGroup[v]?.map(({ type, classify }, index) => {
                                        const component = componentsMap[type];
                                        return (
                                            <Col key={type} span={12}>
                                                <MaterialItem component={component} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    ),
                    style: panelStyle
                }
            })}
                bordered={false}
                style={{
                    background: "white"
                }}
            >
            </Collapse >
        </>
    )
}