import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { StatementProps } from "../typing";
import { inputClass } from "../constants";

export default function NumbericInput({
  statementAtom,
  ...props
}: StatementProps) {
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
