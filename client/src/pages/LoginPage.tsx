import Notification from "@/components/Notification";
import { authApi } from "@/api/authApi";
import { setAuth } from "@/context/slice/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import withLogger from "@/components/hoc/withLogger";
import "@/styles/login-page.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const [login, { isLoading }] = authApi.useLoginMutation();

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        const username = usernameInputRef.current?.value;
        const password = passwordInputRef.current?.value;
        if (username && password) {
            const auth = await login({ username, password }).unwrap();
            dispatch(setAuth(auth));
            navigate("/user", { replace: true });
        }
    };

    return (
        <>
            <Notification />
            <div className="login-container">
                <input
                    ref={usernameInputRef}
                    type="text"
                    placeholder="username"
                    defaultValue="user01"
                />
                <input
                    ref={passwordInputRef}
                    type="password"
                    placeholder="password"
                    defaultValue="123"
                />
                <button disabled={isLoading} onClick={handleLogin}>
                    Login
                </button>
            </div>
        </>
    );
};

const LoginPageWithLogger = withLogger(LoginPage);
export default LoginPageWithLogger;
