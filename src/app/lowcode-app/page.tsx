"use client"
import dynamic from 'next/dynamic';
import { Suspense } from 'react';


// 使用 dynamic import 并禁用 SSR
const CSRComponent = dynamic(
  () => import('@/app/lowcode-app/main'),
  { ssr: false } // 关键配置：跳过服务端渲染
);

export default function CSRPage() {
  return (
    <>
      <Suspense fallback={<>loading</>}>
          <CSRComponent />;
      </Suspense>
    </>
    )
}