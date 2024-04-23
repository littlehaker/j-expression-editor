import { StatementProps } from "@/app/typing";
import { useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import ConditionItem from "./ConditionItem";

export default function Condition({ statementAtom }: StatementProps) {
  const [state, setState] = useAtom(statementAtom);
  const listAtomsAtom = splitAtom(statementAtom);
  const [list] = useAtom(listAtomsAtom);

  function handleAdd(index: number) {
    setState([
      ...state.slice(0, index + 2),
      [["$gt", 2, 1], "baz"],
      ...state.slice(index + 2),
    ]);
  }

  function handleRemove(index: number) {
    setState([...state.slice(0, index + 1), ...state.slice(index + 2)]);
  }

  return (
    <div>
      {list.slice(1).map((itemAtom, index) => (
        <ConditionItem
          key={index}
          statementAtom={itemAtom}
          index={index}
          listLength={list.length - 1}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}
