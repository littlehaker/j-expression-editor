import { focusAtom } from "jotai-optics";
import { StatementProps } from "../typing";
import Select from "./Select";
import Statement from "./Statement";

export default function Computation({ statementAtom }: StatementProps) {
  const leftAtom = focusAtom(statementAtom, (optic) => optic.at(1));
  const rightAtom = focusAtom(statementAtom, (optic) => optic.at(2));
  const operatorAtom = focusAtom(statementAtom, (optic) => optic.at(0));
  return (
    <div className="flex items-end gap-2">
      <span className="mb-1">(</span>
      <Statement statementAtom={leftAtom} />
      <Select
        statementAtom={operatorAtom}
        options={[
          { label: "+", value: "$add" },
          { label: "-", value: "$subtract" },
          { label: "*", value: "$multiply" },
          { label: "/", value: "$divide" },
        ]}
      />
      <Statement statementAtom={rightAtom} />
      <span className="mb-1">)</span>
    </div>
  );
}
