import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useAtom } from "jotai";
import { exprAtom } from "../atoms";

export default function Expression() {
  const [expr] = useAtom(exprAtom);

  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {JSON.stringify(expr, null, 2)}
    </SyntaxHighlighter>
  );
}
