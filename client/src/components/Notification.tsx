import withLogger from "@/components/hoc/withLogger";
import { useNotification } from "@/hooks/useNotification";
import "@/styles/notification.css";

const colorLookup = {
    error: { background: "#F005", color: "#000" },
    success: { background: "#0F05", color: "#000" },
    info: { background: "#0FF5", color: "#000" },
    warning: { background: "#FF05", color: "#000" },
    default: { background: "#0005", color: "#FFF" },
};

const Notification = () => {
    const {
        notification: { type, message },
        closeNotification,
    } = useNotification();

    if (!type || !message) return <></>;

    return (
        <div
            className="notification-container"
            style={{
                ...(colorLookup[type] || colorLookup.default),
            }}
        >
            <p>{`[${type}] : ${message}`}</p>
            <button
                className="notification-close-button"
                onClick={closeNotification}
            >
                X
            </button>
        </div>
    );
};

const NotificationWithLogger = withLogger(Notification);
export default NotificationWithLogger;
