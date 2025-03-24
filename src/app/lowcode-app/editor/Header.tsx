"use client"

import { Button, Space } from 'antd';
import { useComponentsStore } from '@/app/lowcode-app/store/components';
import Link from 'next/link';
export function Header() {

    const { mode, setMode, setCurrentComponent, components } = useComponentsStore();

    return (
        <div className='w-[100%] h-[100%]'>
            <div className='h-[50px] flex justify-between items-center px-[20px]'>
                <div>LowCode Editor</div>
                <Space>
                    {mode === 'edit' && (
                        <>
                            <Button
                                onClick={() => {
                                    setMode('preview');
                                    setCurrentComponent();
                                }}
                                type='dashed'
                            >
                                预览
                            </Button>
                            <Link href='/pro-page'>
                                跳转生产环境
                            </Link>
                            <Button
                                onClick={() => {
                                    const config = JSON.stringify(components);
                                    console.log(config)
                                    localStorage.setItem('lowcode-version', config)
                                }}
                                type='dashed'
                            >
                                发布版本
                            </Button>
                        </>

                    )}
                    {mode === 'preview' && (
                        <Button
                            onClick={() => { setMode('edit') }}
                            type='dashed'
                        >
                            退出预览
                        </Button>
                    )}
                </Space>
            </div>
        </div>
    )
}