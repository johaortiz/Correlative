import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props: { isAllowed: boolean, redirectTo: string, children?: ReactElement }) => {

    if (!props.isAllowed) return <Navigate to={props.redirectTo} replace />;

    return props.children ? props.children : <Outlet />;
};
export default ProtectedRoute;