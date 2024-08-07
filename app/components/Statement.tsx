import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { StatementProps } from "../typing";
import NumbericInput from "./NumericInput";
import Input from "./Input";
import Computation from "./Computation";
import Comparison from "./Comparison";
import Condition from "./Condition/Condition";
import Metrics from "./Metrics/Metrics";
import Boolean from "./Boolean/Boolean";

type StateType =
  | "number"
  | "string"
  | "comparison"
  | "condition"
  | "boolean"
  | "computation"
  | "metrics";
export default function Statement({ statementAtom }: StatementProps) {
  let type: StateType = "number";
  const [state, setState] = useAtom(statementAtom);

  if (state instanceof Array) {
    const symbol = state[0].replace(/\$/, "");
    if (["add", "subtract", "multiply", "divide"].includes(symbol)) {
      type = "computation";
    } else if (["gt", "lt", "eq"].includes(symbol)) {
      type = "comparison";
    } else if (["cond"].includes(symbol)) {
      type = "condition";
    } else if (["metrics"].includes(symbol)) {
      type = "metrics";
    } else if (["and", "or"].includes(symbol)) {
      type = "boolean";
    }
  }
  if (typeof state === "string") {
    type = "string";
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "string") {
      setState("");
    } else if (value === "number") {
      setState(0);
    } else if (value === "computation") {
      setState(["$add", 1, 2]);
    } else if (value === "comparison") {
      setState(["$gt", 2, 1]);
    } else if (value === "metrics") {
      setState(["$metrics", "Height"]);
    } else if (value === "boolean") {
      setState(["$and", ["$gt", 2, 1], ["$lt", 1, 2]]);
    } else {
      setState(["$cond", [["$gt", 2, 1], "foo"], [true, "bar"]]);
    }
  };

  return (
    <div className="statement mt-1 hover:outline outline-gray-200 pt-6 rounded-sm relative">
      <select
        onChange={handleChange}
        value={type}
        className="statement-type outline text-gray-400 outline-gray-200 invisible absolute top-0 left-0 right-0"
      >
        <option value="number">Number</option>
        <option value="string">String</option>
        <option value="condition">Condition</option>
        <option value="comparison">Comparison</option>
        <option value="boolean">Boolean</option>
        <option value="computation">Computation</option>
        <option value="metrics">Metrics</option>
      </select>

      {type === "number" && <NumbericInput statementAtom={statementAtom} />}
      {type === "string" && <Input statementAtom={statementAtom} />}
      {type === "computation" && <Computation statementAtom={statementAtom} />}
      {type === "comparison" && <Comparison statementAtom={statementAtom} />}
      {type === "boolean" && <Boolean statementAtom={statementAtom} />}
      {type === "condition" && <Condition statementAtom={statementAtom} />}
      {type === "metrics" && <Metrics statementAtom={statementAtom} />}
    </div>
  );
}
