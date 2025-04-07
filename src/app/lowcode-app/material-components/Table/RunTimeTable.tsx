import React, { use, useMemo } from "react";
import config from "./config";
import { Table as AntdTable } from "antd";
import dayjs from "dayjs";

export const RunTimeTable = (props) => {
  const { name, id, styles, children, dataSource, ...resetProps } = props ?? {};
  console.log("RunTimeTable", dataSource);
  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      if (item?.props?.type === "date") {
        return {
          title: (
            <div
              className="m-[-16px] p-[16px]"
              data-component-id={item.props?.id}
            >
              {item.props?.title}
            </div>
          ),
          dataIndex: item.props?.dataIndex,
          render: (value: any) =>
            value ? dayjs(value).format("YYYY-MM-DD") : null,
        };
      } else {
        return {
          title: (
            <div
              className="m-[-16px] p-[16px]"
              data-component-id={item.props?.id}
            >
              {item.props?.title}
            </div>
          ),
          dataIndex: item.props?.dataIndex,
        };
      }
    });
  }, [children]);

  return (
    <AntdTable
      columns={columns}
      dataSource={Array.isArray(dataSource) ? dataSource : []}
      pagination={false}
    ></AntdTable>
  );
};

export const Table = {
  ...config,
  component: RunTimeTable,
};
