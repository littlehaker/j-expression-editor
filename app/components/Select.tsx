import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { styleClass } from "../constants";
import { StatementProps } from "../typing";

export default function Select({
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
