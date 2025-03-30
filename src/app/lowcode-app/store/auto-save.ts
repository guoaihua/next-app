"use client";
import { currentData, useComponentsStore, STORAGE_KEY } from "./components";

export const autoSave = () => {
  // 临时的key
  const tempKey = `ziming_temp`;

  // 每隔一分钟，对比一下数据是否有变化，如果有变化，就保存到localStorage中
  setInterval(() => {
    const storageData = JSON.parse(localStorage.getItem(tempKey)) || [];
    const lastStorageData = storageData[0];
    console.log("storageData", lastStorageData);

    // 对比有问题，先不处理了
    if (currentData !== lastStorageData?.[0]?.data) {
      // 数组形式合并
      if (Array.isArray(storageData)) {
        storageData.unshift({
          version: (lastStorageData?.version ?? 0) + 1,
          timeStamp: new Date().toLocaleString(),
          data: JSON.parse(currentData),
        });
      }
      localStorage.setItem(tempKey, JSON.stringify(storageData));
    }
  }, 1000 * 60);
};

export const fetchData = () => {
  // 临时的key
  const tempKey = `ziming_temp`;
  const storageData = JSON.parse(localStorage.getItem(tempKey)) || [];

  // 时间从近到远排序
  return storageData?.sort((a, b) => {
    return new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime();
  });
};

export const changeVersion = (data) => {
  console.log("changeVersion", data);

  // 直接写入存储
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  const rehydrateResult = useComponentsStore.persist.rehydrate();
  if (rehydrateResult instanceof Promise) {
    rehydrateResult.then(() => {
      console.log("数据注入完成");
    });
  }
};
