import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface Props {
  code: string;
  language: string;
}

const Code: React.FC<Props> = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={docco} showLineNumbers={true} >
      {code}
    </SyntaxHighlighter>
  );
};

export default Code;
