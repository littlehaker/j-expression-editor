import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { StatementProps } from "../typing";
import JoyInput from "@mui/joy/Input";

export default function Input({ statementAtom, ...props }: StatementProps) {
  const [value, setValue] = useAtom(statementAtom);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  return (
    <JoyInput
      variant="outlined"
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
}
