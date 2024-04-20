import { useAppDispatch, useAppSelector } from "@/context/store";

export const useAuth = () => {
    const user = useAppSelector((store) => store.auth.user);
    const dispatch = useAppDispatch();

    return { user, dispatch };
};
