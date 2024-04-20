import { useNavigate } from "react-router-dom";
import Notification from "@/components/Notification";
import { clearAuth, updateAccessToken } from "@/context/slice/authSlice";
import useProtected from "@/hooks/useProtected";
import { parseJwt } from "@/utils/tokenUtils";
import { showMessage } from "@/context/slice/notificationsSlice";
import CodeSnippet from "@/components/CodeSnippet";
import withLogger from "@/components/hoc/withLogger";
import { POLLING_INTERVAL } from "@/constants/apiConstants";
import "@/styles/protected-resource-page.css";

const ProtectedResourcePage = () => {
    const navigate = useNavigate();
    const { user, query, refreshAccessToken, logout, dispatch } =
        useProtected();
    const { data: protectedData, refetch: refreshProtectedData } = query;

    const handleRefreshProtectedData = async () => {
        dispatch(
            showMessage({
                type: "info",
                message: "getting protected info ...",
            })
        );
        await refreshProtectedData();
        dispatch(
            showMessage({
                type: "success",
                message: `[${user?.username}] get protected info successful`,
            })
        );
    };

    const handleRefreshAccessToken = async () => {
        if (!user?.id) return;

        const result = await refreshAccessToken({ id: user?.id }).unwrap();
        const { accessToken } = result;

        if (!accessToken) {
            await logout({ id: user?.id });
            dispatch(clearAuth());
            navigate("/", { replace: true });
            return;
        }

        dispatch(updateAccessToken({ accessToken }));
    };

    const handleLogout = async () => {
        if (!user?.id) return;

        await logout({ id: user?.id });
        dispatch(clearAuth());
        navigate("/", { replace: true });
    };

    return (
        <div className="home-container">
            <Notification />

            <section>
                <div className="section-header">
                    <h1>Protected Resource</h1>
                    <button onClick={handleRefreshProtectedData}>
                        refresh protected data (auto refresh each{" "}
                        {POLLING_INTERVAL / 1000} seconds)
                    </button>
                </div>
                <CodeSnippet code={protectedData ?? {}} />
            </section>

            <hr></hr>

            <section>
                <div className="section-header">
                    <h1>User Access Token</h1>
                    <button onClick={handleRefreshAccessToken}>
                        refresh access token
                    </button>
                </div>
                {user?.accessToken && (
                    <CodeSnippet code={parseJwt(user?.accessToken ?? "")} />
                )}
            </section>

            <hr></hr>

            <section>
                <div className="section-header">
                    <h1>User Auth</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <CodeSnippet code={user ?? {}} />
            </section>
        </div>
    );
};

const ProtectedResourcePageWithLogger = withLogger(ProtectedResourcePage);
export default ProtectedResourcePageWithLogger;
