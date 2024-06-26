import { focusAtom } from "jotai-optics";
import { StatementProps } from "../typing";
import Select from "./Select";
import Statement from "./Statement";

export default function Comparison({ statementAtom }: StatementProps) {
  const leftAtom = focusAtom(statementAtom, (optic) => optic.at(1));
  const rightAtom = focusAtom(statementAtom, (optic) => optic.at(2));
  const operatorAtom = focusAtom(statementAtom, (optic) => optic.at(0));
  return (
    <div className="flex items-end gap-2">
      <Statement statementAtom={leftAtom} />
      <Select
        statementAtom={operatorAtom}
        options={[
          { label: ">", value: "$gt" },
          { label: "<", value: "$lt" },
          { label: "=", value: "$eq" },
        ]}
      />
      <Statement statementAtom={rightAtom} />
    </div>
  );
}
