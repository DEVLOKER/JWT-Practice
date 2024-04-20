import { useAppDispatch, useAppSelector } from "../context/store";

const useGlobalStore = () => {
    const store = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    return [store, dispatch] as const;
};

export default useGlobalStore;
