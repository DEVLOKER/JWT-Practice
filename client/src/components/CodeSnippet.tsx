import withLogger from "@/components/hoc/withLogger";
import { syntaxHighlight } from "@/utils/syntaxCodeUtils";
// import { FC, ReactElement } from "react";
type Props = { code: object };
// const CodeSnippet: FC<{ code: object }> = ({ code = {} }): ReactElement => {
const CodeSnippet = ({ code = {} }: Props) => {
    return (
        // <code>
        <pre
            dangerouslySetInnerHTML={{
                __html: syntaxHighlight(JSON.stringify(code, undefined, 4)),
            }}
        />
        // </code>
    );
};

const CodeSnippetWithLogger = withLogger(CodeSnippet);
export default CodeSnippetWithLogger;
