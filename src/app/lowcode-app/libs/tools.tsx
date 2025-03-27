
import { Component } from '@/app/lowcode-app/types/component'
// 根据Id查找元素
export const getElementById = (components: Component[], id: number): Component | undefined => {
    if (!components || !id) {
        return
    }
    for (const component of components) {
        if (component.id === id) {
            return component
        }
        const result = getElementById(component.children, id)
        if (result) {
            return result
        }
    }
}

// 执行js脚本代码
export const createSafeFunction = (code) => {
    try {
        return new Function('return ' + code)();
    } catch (e) {
        console.error('代码解析错误:', e);
        return null;
    }
};


// lib/monaco-path.ts
export const getMonacoPublicPath = () => {
    if (typeof window === 'undefined') return '';
    const isProd = process.env.NODE_ENV === 'production';
    const base = isProd ? window.location.origin + '/lowcode' : '';
    return `${base}/_next/static/chunks/monaco/`;
};