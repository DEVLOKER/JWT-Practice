import { routes } from "@/routes/routes";
import withLogger from "@/components/hoc/withLogger";
import RoutesGenerator from "@/routes/RoutesGenerator";

const App = () => {
    return <RoutesGenerator routes={routes} />;
};

const AppWithLogger = withLogger(App);
export default AppWithLogger;
