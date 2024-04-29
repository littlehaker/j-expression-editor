import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { StatementProps } from "../typing";
import JoyInput from "@mui/joy/Input";

export default function NumbericInput({ statementAtom }: StatementProps) {
  const [value, setValue] = useAtom(statementAtom);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }
  return (
    <JoyInput
      className="w-32"
      variant="outlined"
      type="number"
      onChange={handleChange}
      value={value}
    />
  );
}
