import * as React from "react";
export interface PageHeaderProps {
    // string?: React.ReactNode | string;
    any: any;
    boolean: boolean;
    number: number;
    string:string;
    array?: Array<any>;     // <number><string>...
    x: [string, number];    // x = ['hello', 10]; OK   x = [10, 'hello']; Error
    unusable: void;         // undefined 和 null
    u: undefined;   
    n: null;
    node:React.ReactNode;

    readonly ro: number;
    roArr: ReadonlyArray<number>;   // 只读数组
    [propName: string]: any;
    func: (source: string, subString: string) => boolean;



    breadcrumbList?: Array<{ title: React.ReactNode; href?: string }>;
    tabList?: Array<{ key: string; tab: React.ReactNode }>;
    onTabChange?: (key: string) => void;
}

export default class PageHeader extends React.Component<PageHeaderProps, any> {}
