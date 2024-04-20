export type TNotification = {
    type: "error" | "success" | "info" | "warning";
    // title: string;
    message: string;
    // icon: string;
    // timer: number;
    hideAfterDelay: number;
};
