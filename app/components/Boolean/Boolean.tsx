import { StatementProps } from "../../typing";
import Select from "../Select";
import { useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import BooleanItem from "./BooleanItem";

export default function Boolean({ statementAtom }: StatementProps) {
  const [state, setState] = useAtom(statementAtom);
  const listAtomsAtom = splitAtom(statementAtom);
  const [list] = useAtom(listAtomsAtom);

  function handleAdd(index: number) {
    setState([
      ...state.slice(0, index + 2),
      ["$gt", 2, 1],
      ...state.slice(index + 2),
    ]);
  }

  function handleRemove(index: number) {
    setState([...state.slice(0, index + 1), ...state.slice(index + 2)]);
  }

  return (
    <div className="flex gap-2 items-center">
      <div>
        <Select
          statementAtom={list[0]}
          options={[
            { label: "AND", value: "$and" },
            { label: "OR", value: "$or" },
          ]}
        />
      </div>
      <div className="border border-black w-5 self-stretch border-r-0"></div>
      <div>
        {list.slice(1).map((itemAtom, index) => (
          <BooleanItem
            key={index}
            statementAtom={itemAtom}
            index={index}
            listLength={list.length - 1}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
