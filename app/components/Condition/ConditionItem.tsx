import { spanClass } from "@/app/constants";
import { StatementProps } from "@/app/typing";
import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import Statement from "../Statement";

export default function ConditionItem({
  statementAtom,
  index,
  listLength,
  onAdd,
  onRemove,
}: StatementProps & {
  index: number;
  listLength: number;
  onAdd: (index: number) => void;
  onRemove: (index: number) => void;
}) {
  const [state] = useAtom(statementAtom);
  const condAtom = focusAtom(statementAtom, (optic) => optic.at(0));
  const valueAtom = focusAtom(statementAtom, (optic) => optic.at(1));
  const isElse = state[0] === true;
  const isFirst = index === 0;
  return (
    <div className="flex items-end">
      {isElse ? (
        <span className={spanClass}>Else</span>
      ) : (
        <>
          <span className={spanClass}>{isFirst ? "If" : "Else If"}</span>
          <Statement statementAtom={condAtom} />
          <span className={spanClass}>Then</span>
        </>
      )}
      <Statement statementAtom={valueAtom} />
      {!isElse && (
        <button
          className="outline mb-1 px-2 rounded-sm mx-1"
          onClick={() => onAdd(index)}
        >
          +
        </button>
      )}
      {!isElse && listLength > 2 && (
        <button
          className="outline mb-1 px-2 rounded-sm mx-1"
          onClick={() => onRemove(index)}
        >
          x
        </button>
      )}
    </div>
  );
}
