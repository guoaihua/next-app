import { Button, Drawer, List, message, Typography, Modal } from "antd";
import { useEffect, useState } from "react";
import { fetchData, changeVersion } from "@lowcode/store/auto-save";
import classNames from "classnames";

interface HistoryVersionProps {
  setShowDrawer: (value: boolean) => void;
  showDrawer: boolean;
}

const HistoryVersion = (props: HistoryVersionProps) => {
  const { setShowDrawer, showDrawer } = props;
  const [versionData, setVersionData] = useState([]);
  const [currentSelected, setCurrentSelected] = useState<any>({});
  const freshVersionData = () => {
    const versionData = fetchData();
    setVersionData(versionData);
  };

  useEffect(() => {
    freshVersionData();
  }, [showDrawer]);

  return (
    <Drawer
      title="本地历史版本"
      onClose={() => setShowDrawer(false)}
      open={showDrawer}
    >
      <List
        rowKey={(item) => item.version}
        itemLayout="vertical"
        header={
          <div>
            <Button
              type="dashed"
              onClick={() => {
                changeVersion(currentSelected.data);
                freshVersionData();
                setShowDrawer(false);
                message.success("切换成功");
              }}
            >
              切换到此版本
            </Button>
            <Button
              type="dashed"
              disabled
              onClick={() => {
                setShowDrawer(false);
                message.success("切换成功");
              }}
            >
              对比版本差异
            </Button>
          </div>
        }
        bordered
        dataSource={versionData}
        renderItem={(item) => (
          <List.Item
            className={classNames(
              "hover:bg-amber-100 cursor-pointer transition-colors",
              `${currentSelected.version === item.version ? "bg-amber-200" : ""}`,
            )}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              console.log("item", item);
              setCurrentSelected(item);
            }}
          >
            <p className=" flex justify-between">
              <span>版本：{item.version}</span>{" "}
              {item.isManual ? (
                <Typography.Text mark>手动添加</Typography.Text>
              ) : null}
            </p>
            <p>最后保存时间：{item.timeStamp}</p>
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default HistoryVersion;
