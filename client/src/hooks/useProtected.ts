import { authApi } from "@/api/authApi";
import { userApi } from "@/api/userApi";
import { POLLING_INTERVAL } from "@/constants/apiConstants";
import { useAppDispatch } from "@/context/store";
import { useAuth } from "@/hooks/useAuth";

const useProtected = () => {
    const { user } = useAuth();
    const query = userApi.useProtectedInfoQuery(
        { username: user?.username },
        {
            pollingInterval: POLLING_INTERVAL,
            skipPollingIfUnfocused: true,
        }
    );
    const dispatch = useAppDispatch();

    const [refreshAccessToken] = authApi.useRefreshAccessTokenMutation();

    const [logout] = authApi.useLogoutMutation();

    return {
        user,
        query,
        refreshAccessToken,
        logout,
        dispatch,
    };
};

export default useProtected;
