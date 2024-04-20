import withLogger from "@/components/hoc/withLogger";
import { useNavigate } from "react-router-dom";
import "@/styles/not-found-page.css";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-page-container">
            <h1>404❗</h1>
            <p>The resource you have requested does not exist.</p>
            {/* <Link to="/">Back</Link> */}
            <button onClick={() => navigate(-1)}>Go back</button>
        </div>
    );
};

const NotFoundPageWithLogger = withLogger(NotFoundPage);
export default NotFoundPageWithLogger;
