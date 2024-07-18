import { focusAtom } from "jotai-optics";
import { StatementProps } from "../typing";
import Select from "./Select";
import Statement from "./Statement";

export default function Boolean({ statementAtom }: StatementProps) {
  const leftAtom = focusAtom(statementAtom, (optic) => optic.at(1));
  const rightAtom = focusAtom(statementAtom, (optic) => optic.at(2));
  const operatorAtom = focusAtom(statementAtom, (optic) => optic.at(0));
  return (
    <div className="flex items-end gap-2">
      <Statement statementAtom={leftAtom} />
      <Select
        statementAtom={operatorAtom}
        options={[
          { label: "and", value: "$and" },
          { label: "or", value: "$or" },
        ]}
      />
      <Statement statementAtom={rightAtom} />
    </div>
  );
}
