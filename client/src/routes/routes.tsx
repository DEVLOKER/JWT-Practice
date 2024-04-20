import { lazy } from "react";
import { TRoute } from "@/types/route";

import LoginPage from "@/pages/LoginPage";
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const ProtectedResourcePage = lazy(
    () => import("@/pages/ProtectedResourcePage")
);

export const routes: TRoute[] = [
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/user",
        element: <ProtectedResourcePage />,
        needAuthentication: true,
        // routes: [],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
];
