import React, { ComponentType } from "react";

const log = console.info;

const withLogger = (WrappedComponent: ComponentType) => {
    const WithLoggerComponent: React.FC = (props) => {
        const name = WrappedComponent.displayName || WrappedComponent.name;

        React.useEffect(() => {
            log(`component ${name} mounted`);
            return () => log(`component ${name} unmounted`);
        }, []);

        React.useEffect(() => log(`component ${name} updated`));

        return <WrappedComponent {...props} />;
    };
    return WithLoggerComponent;
};

export default withLogger;
