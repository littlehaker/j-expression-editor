import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { inputClass } from "../constants";
import { StatementProps } from "../typing";

export default function Input({ statementAtom, ...props }: StatementProps) {
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
