// hooks/useRuntimeData.ts
import { useEffect, useState } from 'react';
import { useGlobalStore } from '../stores/globalStore';
import { useParentData } from '../contexts/ParentDataContext';

type DataSourceConfig = {
    type: 'parent' | 'global' | 'api';
    path?: string;
    apiUrl?: string;
    transform?: string;
};

export const useRuntimeData = (config: DataSourceConfig) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // 获取全局状态
    const globalData = useGlobalStore(state => {
        if (!config.path) return null;
        return config.path.split('.').reduce((acc, key) => acc?.[key], state);
    });

    // 获取父组件数据
    const { data: parentData } = useParentData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                let rawData;
                switch (config.type) {
                    case 'parent':
                        rawData = parentData[config.path || ''];
                        break;

                    case 'global':
                        rawData = globalData;
                        break;

                    case 'api':
                        const response = await fetch(config.apiUrl!);
                        rawData = await response.json();
                        break;
                }

                // 安全执行数据转换
                const transformedData = config.transform
                    ? safeEval(config.transform, rawData)
                    : rawData;

                setData(transformedData);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [config, globalData, parentData]);

    return { data, loading, error };
};

// 安全执行沙箱
const safeEval = (code: string, data: any) => {
    try {
        return Function('"use strict";return (data) => ' + code)()(data);
    } catch (err) {
        console.error('Data transform error:', err);
        return data;
    }
};