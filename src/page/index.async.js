import asyncComponent from "../lib/asyncComponent.js";
// 비동기적으로 컴포넌트 전환
export const borad = asyncComponent(() => import("./borad"));
export const post = asyncComponent(() => import("./post"));
export const login = asyncComponent(() => import("./login"));
export const write = asyncComponent(() => import("./write"));
export const update = asyncComponent(() => import("./update"));
export const notFound = asyncComponent(() => import("./notFound"));
