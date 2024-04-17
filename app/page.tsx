"use client";

import { useAtom, atom, createStore, Provider } from "jotai";
import { splitAtom } from "jotai/utils";
import type { WritableAtom } from "jotai";
import { focusAtom } from "jotai-optics";

import JExpression from "j-expression";
import { ChangeEvent } from "react";

interface Metrics {
  value: number;
  name: string;
}

const expr = new JExpression();
const exprAtom = atom([
  "$cond",
  [["$gt", ["$minus", ["$metrics", "height"], 30], 30], "It's too high"],
  [["$gt", ["$metrics", "width"], 80], "It's too wide"],
  [true, "It's OK"],
]);
const metricsAtom = atom<Metrics[]>([
  { name: "width", value: 100 },
  { name: "height", value: 50 },
]);
const metricsByNameAtom = atom((get) => {
  const metricsList = get(metricsAtom);
  const ret: Record<string, number> = {};
  metricsList.forEach((item) => {
    ret[item.name] = item.value;
  });
  return ret;
});

const resultAtom = atom((get) => {
  const metricsObj = get(metricsByNameAtom);
  expr.define("metrics", (name: string) => {
    return metricsObj[name] ?? 0;
  });
  return expr.eval(get(exprAtom));
});

interface StatementProps {
  statementAtom: WritableAtom<any, any, any>;
}

function MetricsItem({
  metricsAtom,
}: {
  metricsAtom: WritableAtom<Metrics, any, any>;
}) {
  const nameAtom = focusAtom(metricsAtom, (optic) => optic.prop("name"));
  const [name] = useAtom(nameAtom);
  const valueAtom = focusAtom(metricsAtom, (optic) => optic.prop("value"));

  return (
    <div>
      {/* <Input statementAtom={nameAtom} /> */}
      {name}:
      <NumbericInput statementAtom={valueAtom} />
    </div>
  );
}

function MetricsEditor() {
  const metricsListAtomsAtom = splitAtom(metricsAtom);
  const [metricsListAtoms] = useAtom(metricsListAtomsAtom);

  return (
    <div>
      Metrics
      {metricsListAtoms.map((item) => (
        <MetricsItem metricsAtom={item} />
      ))}
    </div>
  );
}

const inputClass = "outline outline-gray-600 rounded-sm m-1 pl-2";
const styleClass = "outline outline-gray-600 rounded-sm m-1 pl-2 w-auto h-6";

function NumbericInput({ statementAtom, ...props }: StatementProps) {
  const [value, setValue] = useAtom(statementAtom);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }
  return (
    <input
      className={inputClass + " w-24"}
      onChange={handleChange}
      value={value}
      type="number"
      {...props}
    />
  );
}

function Input({ statementAtom, ...props }: StatementProps) {
  const [value, setValue] = useAtom(statementAtom);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  return (
    <input
      className={inputClass}
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
}

function Select({
  statementAtom,
  options,
}: StatementProps & { options: { label: string; value: string }[] }) {
  const [value, setValue] = useAtom(statementAtom);
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
  }
  return (
    <select className={styleClass} onChange={handleChange} value={value}>
      {options.map(({ label, value }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

const spanClass = "px-3 mb-1";

function ConditionItem({
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

function Metrics({ statementAtom }: StatementProps) {
  const [metricsList] = useAtom(metricsAtom);
  const metricsNameAtom = focusAtom(statementAtom, (optic) => optic.at(1));
  return (
    <Select
      statementAtom={metricsNameAtom}
      options={metricsList.map(({ name, value }) => ({
        label: `${name} ( ${value} )`,
        value: name,
      }))}
    />
  );
}

function Condition({ statementAtom }: StatementProps) {
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

function Comparison({ statementAtom }: StatementProps) {
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
function Computation({ statementAtom }: StatementProps) {
  const leftAtom = focusAtom(statementAtom, (optic) => optic.at(1));
  const rightAtom = focusAtom(statementAtom, (optic) => optic.at(2));
  const operatorAtom = focusAtom(statementAtom, (optic) => optic.at(0));
  return (
    <div className="flex items-end gap-2">
      <Statement statementAtom={leftAtom} />
      <Select
        statementAtom={operatorAtom}
        options={[
          { label: "+", value: "$add" },
          { label: "-", value: "$minus" },
        ]}
      />
      <Statement statementAtom={rightAtom} />
    </div>
  );
}

type StateType =
  | "number"
  | "string"
  | "comparison"
  | "condition"
  | "computation"
  | "metrics";
function Statement({ statementAtom }: StatementProps) {
  let type: StateType = "number";
  const [state, setState] = useAtom(statementAtom);

  if (state instanceof Array) {
    const symbol = state[0].replace(/\$/, "");
    if (["add", "minus"].includes(symbol)) {
      type = "computation";
    } else if (["gt", "lt", "eq"].includes(symbol)) {
      type = "comparison";
    } else if (["cond"].includes(symbol)) {
      type = "condition";
    } else if (["metrics"].includes(symbol)) {
      type = "metrics";
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
      setState(["$metrics", "height"]);
    } else {
      setState(["$cond", [["$gt", 2, 1], "foo"], [true, "bar"]]);
    }
  };

  return (
    <div className="statement mt-1 hover:outline outline-gray-200 flex flex-col">
      <select
        onChange={handleChange}
        value={type}
        className="statement-type outline text-gray-400 outline-gray-200 invisible items-start"
      >
        <option value="number">Number</option>
        <option value="string">String</option>
        <option value="condition">Condition</option>
        <option value="comparison">Comparison</option>
        <option value="computation">Computation</option>
        <option value="metrics">Metrics</option>
      </select>

      {type === "number" && <NumbericInput statementAtom={statementAtom} />}
      {type === "string" && <Input statementAtom={statementAtom} />}
      {type === "computation" && <Computation statementAtom={statementAtom} />}
      {type === "comparison" && <Comparison statementAtom={statementAtom} />}
      {type === "condition" && <Condition statementAtom={statementAtom} />}
      {type === "metrics" && <Metrics statementAtom={statementAtom} />}
    </div>
  );
}

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
