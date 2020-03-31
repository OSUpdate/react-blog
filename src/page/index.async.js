
import asyncComponent from "../lib/asyncComponent";

export const NotFound = asyncComponent(() => import("./NotFoundPage"));
export const Index = asyncComponent(() => import("./IndexPage"));
export const Read = asyncComponent(() => import("./ReadPage"));
export const Edit = asyncComponent(() => import("./EditPage"));
export const Login = asyncComponent(() => import("./LoginPage"));