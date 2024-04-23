"use client";

import { useAtom } from "jotai";
import { exprAtom, resultAtom } from "./atoms";

import Statement from "./components/Statement";
import MetricsEditor from "./components/Metrics/MetricsEditor";

export default function Home() {
  const [expr] = useAtom(exprAtom);
  const [result] = useAtom(resultAtom);

  return (
    <main className="flex flex-col items-center pt-10">
      <MetricsEditor />
      <hr className="my-10 w-full" />
      <Statement statementAtom={exprAtom} />
      <hr className="my-10 w-full" />
      <table className="w-1/2 divide-y">
        <thead>
          <tr>
            <td className="p-2">JExpression</td>
            <td className="p-2">Result</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">
              <pre>{JSON.stringify(expr, null, 2)}</pre>
            </td>
            <td className="p-2">
              <pre>{JSON.stringify(result)}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
