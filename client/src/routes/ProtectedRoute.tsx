import { useAuth } from "@/hooks/useAuth";
import { parseJwt } from "@/utils/tokenUtils";
import React from "react";
import { Navigate } from "react-router-dom";

export type Props = {
    needAuthentication: boolean;
    component: React.ReactNode; //JSX.Element
};

const ProtectedRoute = ({
    needAuthentication,
    component: Component,
}: Props) => {
    const { user } = useAuth();
    const accessToken = user?.accessToken ?? null;

    if (!accessToken) return <Navigate to="/" />;

    if (needAuthentication && parseJwt(accessToken).isExpired)
        return <Navigate to="/" />;

    return Component;
};

export default ProtectedRoute;
